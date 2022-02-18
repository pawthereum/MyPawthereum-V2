import PawthStats from './components/PawthStats';
import Ranks from "./components/Ranks.jsx";
import PriceChart from './components/PriceChart';
import Reflections from "./components/Reflections";
import CharityStats from './components/CharityStats';
import { Card } from "antd";
import useBreakpoint from 'hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { PAWTH_ADDRESS } from '../../constants'
import { PAWTH_ABI } from '../../constants/abis/pawth'
import { useMoralis } from "react-moralis";
import { Skeleton } from 'antd'

function Stats() {
  const { Moralis, chainId } = useMoralis();
  const { isMobile } = useBreakpoint()
  const [charityWallet, setCharityWallet] = useState(null)

  useEffect(() => {
    if (!chainId) return

    getCharityWallet()

    async function getCharityWallet() {
      const web3Provider = await Moralis.enableWeb3()
      const pawthAddress = PAWTH_ADDRESS[chainId]
      const pawthContract = new web3Provider.eth.Contract(
        JSON.parse(PAWTH_ABI[chainId]),
        pawthAddress
      )
      const pawthCharityWallet = await pawthContract.methods.charityWallet().call()
      setCharityWallet(pawthCharityWallet)
    }

  }, [chainId])

  const styles = {
    title: {
      fontSize: "30px",
      fontWeight: "600",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      flexDirection: "row",
      paddingBottom: "10px",
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: isMobile ? "400px" : "640px",
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  return (
    <div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <PawthStats />
        </Card>
      </div>
      {
        isMobile ? '' :
        <div style={styles.row}>
          <Card style={styles.card}>
            <PriceChart />
          </Card>
        </div>
      }
      <div style={styles.row}>
        <Card style={styles.card}>
          <Reflections />
        </Card>
      </div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <Ranks />
        </Card>
      </div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <Skeleton loading={!chainId || !charityWallet}>
            <CharityStats
              charityWallet={charityWallet}
              chainId={chainId}
            />
          </Skeleton>
        </Card>
      </div>
    </div>
  );
}

export default Stats;
