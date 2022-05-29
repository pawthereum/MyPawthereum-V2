import { useEffect, useState } from "react";
import AppContext from './AppContext';
import { useMoralis } from "react-moralis";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import PawSwap from 'components/DEX/PawSwap';
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Grid, Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import Donate from 'components/Donate';
import Stats from 'components/Stats';
import Vote from 'components/Vote';
import Flooz from 'components/Flooz';
import Proposal from 'components/Vote/components/Proposal';
import MenuItems from "./components/MenuItems";
import { PAWTH_ADDRESS, COINGECKO_ID, COLORS } from "./constants";
import { getFirestore, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import AddLiquidity from "components/DEX/components/AddLiquiditybu";
import DexComingSoon from "components/DEX/DexComingSoon";
import PawSend from "components/PawSend/PawSend"
import RovingDogs from 'components/RovingDogs'
import Pool from 'components/Stake'
import PawSwapWidget from 'components/DEX/PawSwapWidget'
import useSwapContext from "hooks/swapContext";
import useListingContext from "hooks/listingContext"
const CoinGecko = require('coingecko-api')
 
const { Header, Footer } = Layout;
const { useBreakpoint } = Grid;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  mobileFooter: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    minHeight: '64px',
    background: "#fff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  }
};
const App = ({ isServerInfo }) => {
  const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, chainId, account } = useMoralis();

  const [searchParams, setSearchParams] = useSearchParams();
  const hideFooter = searchParams.get("hide_footer")
  const hideHeader = searchParams.get("hide_header")
  const bg = searchParams.get("bg")
  console.log('HIDE FOOTER', hideFooter)
  const dynamicStyles = {
    layout: {
      overflow: "auto", 
      minHeight: '100vh',
      backgroundColor: bg || `radial-gradient(ellipse at top, ${COLORS.defaultBg}, transparent 425%),radial-gradient(ellipse at bottom,  ${COLORS.primary}, transparent)`,
      background: bg || `radial-gradient(ellipse at top, ${COLORS.defaultBg}, transparent 425%),radial-gradient(ellipse at bottom,  ${COLORS.primary}, transparent)`
    }
  }

  const [multichainEnabled, setMultichainEnabled] = useState(false);
  const toggleUseMultichain = (toggle) => {
    setMultichainEnabled(toggle)
  }

  const swapContext = useSwapContext()
  const listingContext = useListingContext()

  const globalState = {
    multichainEnabled,
    toggleUseMultichain,
    ...swapContext,
    ...listingContext,
  }

  const [logo, setLogo] = useState('https://pawthereum.com/wp-content/uploads/shared-files/pawth-logo-transparent.png')
  const screens = useBreakpoint()
  const pawthAddress = PAWTH_ADDRESS[chainId]

  useEffect(() => {
    if (!account || !isWeb3Enabled) return
    logVisit()
    async function logVisit() {
      const web3Provider = Moralis.web3Library;
      const checkSummedAddress = web3Provider.utils.getAddress(account)
      const db = getFirestore()
      const docRef = doc(db, 'pawthereum', 'wallets', `${checkSummedAddress}`, 'visits')
      const docSnap = await getDoc(docRef)
      let dates = []
      if (docSnap.exists()) {
        dates = docSnap.data().dates || []
        dates.push(Timestamp.fromDate(new Date()))
        await updateDoc(docRef, {
          dates
        })
      } else {
        dates.push(Timestamp.fromDate(new Date()))
        await setDoc(docRef, {
          dates: dates
        })
      }
    }
  }, [account, isWeb3Enabled])

  function getChainNameById (chainId) {
    switch (chainId) {
      case '0x1':
        return 'eth'
      case '0x38':
        return 'bsc'
      default:
        return 'eth'
    }
  }

  useEffect(() => {
    getLogo()
    async function getLogo () {
      const CoinGeckoClient = new CoinGecko()
      const coinGeckoData = await CoinGeckoClient.coins.fetch(COINGECKO_ID, {})
      const tokenData = coinGeckoData.data
      const tokenLogo = tokenData.image.large
      return setLogo(tokenLogo)
    }
  }, [])

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <AppContext.Provider value={globalState}>
      <Layout style={{...styles.layout, ...dynamicStyles.layout}}>
        {
          hideHeader ? '' :
          <Header style={styles.header}>
            <Logo />
            <MenuItems />
            { screens.xs ? <Chains /> : '' }
            <div style={styles.headerRight}>
              {
                screens.xs ? '' :
                <>
                  <Chains />
                  <TokenPrice
                    address={pawthAddress}
                    chain={getChainNameById(chainId)}
                    image={logo}
                    size="40px"
                  />
                  <NativeBalance />
                  <Account />
                </>
              }
            </div>
          </Header>
        }

        <div style={styles.content}>
          <Routes>
            <Route exact path="/quickstart" element={<QuickStart isServerInfo={isServerInfo} />}/>
            <Route path="/stats" element={<Stats />}/>
            <Route path="/vote/:id" element={<Proposal />}/>
            <Route path="/vote" element={<Vote />}/>
            <Route path="/wallet" element={<Wallet />}/>
            <Route path="/widget/pawswap" element={<PawSwapWidget />}/>
            <Route path="/pawswap" element={
              chainId === '0x61' || chainId === '0x539' ?  <PawSwap /> : <DexComingSoon/>
            }/>
            <Route path="/pawsend" element={<PawSend />}/>
            <Route path="/rovingdogs" element={<RovingDogs />}/> {/* may not be used if partnership falls through */}
            <Route path="/staking/pools" element={<Pool />} />
            <Route path="/erc20balance" element={<ERC20Balance />}/>
            <Route path="/flooz" element={<Flooz />}/>
            <Route path="/onramp" element={<Ramper />}/>
            <Route path="/erc20transfers" element={<ERC20Transfers />}/>
            <Route path="/nftBalance" element={<NFTBalance />}/>
            <Route path="/contract" element={<Contract />}/>
            <Route path="/donate" element={<Donate />}/>
            <Route path="/nonauthenticated" element={
              <>Please login using the "Authenticate" button</>
            }/>
            <Route path="/" element={<Stats />}/>
          </Routes>
        </div>
        {
          hideFooter ? '' :
          <Footer style={{ 
            textAlign: "center", 
            paddingBottom: screens.xs ? '74px' : '0px',
            backgroundColor: 'transparent'
          }}>
            <Text style={{ display: "block" }}>
              ⭐️ Version 2.0.7
            </Text>
  
            <Text style={{ display: "block" }}>
              🐾 Follow the Pawth
            </Text>
  
            <Text style={{ display: "block" }}>
              📖 Read more about{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://pawthereum.com"
              >
                Pawthereum
              </a>
            </Text>
          </Footer>
        }

        {
          screens.xs && !hideFooter
          ?
            <Footer style={{ textAlign: "center", ...styles.mobileFooter }}>
              <TokenPrice
                address={pawthAddress}
                chain={getChainNameById(chainId)}
                image={logo}
                size="40px"
              />
              <NativeBalance />
              <Account />
            </Footer>
          : ''
        }
      </Layout>
    </AppContext.Provider>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <a href="https://pawthereum.com">
      <img alt="logo" src="https://github.com/pawthereum/MyPawthereum/raw/main/src/assets/images/myPawthLogo.png" width="56" />
    </a>
  </div>
);

export default App;
