import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
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
import { PAWTH_ADDRESS } from "./constants";
import { getFirestore, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
 
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
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, chainId, account } = useMoralis();

  const screens = useBreakpoint()
  const pawthAddress = PAWTH_ADDRESS[chainId]

  useEffect(() => {
    if (!account) return
    logVisit()
    async function logVisit() {
      const db = getFirestore()
      const docRef = doc(db, 'pawthereum', 'wallets', `${account}`, 'visits')
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
  }, [account])

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
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ overflow: "auto", minHeight: '100vh' }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            {
              screens.xs ? '' :
              <>
                <Chains />
                <TokenPrice
                  address={pawthAddress}
                  chain={getChainNameById(chainId)}
                  image="https://pawthereum.com/shared-files/2015/?logo-notext-trsp-1.png"
                  size="40px"
                />
                <NativeBalance />
                <Account />
              </>
            }
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/vote/:id">
              <Proposal />
            </Route>
            <Route path="/vote">
              <Vote />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/pawswap">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>BSC Testnet</span>} key="3">
                  <DEX chain="bsctest" />
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab={<span>Polygon</span>} key="4">
                  <DEX chain="polygon" />
                </Tabs.TabPane> */}
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/flooz">
              <Flooz />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/donate">
              <Donate />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
            <Route path="/">
              <Stats />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ 
        textAlign: "center", 
        paddingBottom: screens.xs ? '74px' : '0px'
      }}>
        <Text style={{ display: "block" }}>
          ⭐️ What an awesome piece of info!
        </Text>

        <Text style={{ display: "block" }}>
          🐾 More information about Pawthereum!
        </Text>

        <Text style={{ display: "block" }}>
          📖 Read more about{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://pawthereum.com"
          >
            the upcoming donation
          </a>
        </Text>
      </Footer>
      {
        screens.xs 
        ?
          <Footer style={{ textAlign: "center", ...styles.mobileFooter }}>
            <Chains />
            <Account />
          </Footer>
        : ''
      }
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img alt="logo" src="https://github.com/pawthereum/MyPawthereum/raw/main/src/assets/images/myPawthLogo.png" width="56" />
  </div>
);

export default App;