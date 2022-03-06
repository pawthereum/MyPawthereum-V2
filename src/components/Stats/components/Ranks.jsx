// import { useEffect, useStaste } from "react";
import { useMoralis, useERC20Balances } from "react-moralis";
import Account from "../../Account/Account";
import { PAWTH_ADDRESS } from '../../../constants'
import { Skeleton } from "antd";
import { ranks } from './ranks';
import { useContext, useEffect, useState } from "react";
import AppContext from '../../../AppContext'

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "10px",
  },
  body: {
    textAlign: "center",
  },
  rankImg: { 
    width: '100%', 
    maxWidth: '200px', 
    height: 'auto',
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    flexDirection: "row",
    paddingBottom: "10px",
  },
  nextRankImg: { 
    maxWidth: '50px', 
    height: 'auto',
  }
};

function Ranks() {
  const globalContext = useContext(AppContext);
  const { account, chainId } = useMoralis();
  const { data: bscAssets } = useERC20Balances({ chain: '0x38' });
  const { data: ethAssets } = useERC20Balances({ chain: '0x1' });
  const [pawthBalance, setPawthBalance] = useState(0)

  useEffect(() => {
    const bscPawthAddress = PAWTH_ADDRESS['0x38']
    const bscPawth = bscAssets ? bscAssets.find(a => a.token_address === bscPawthAddress) : []
    const bscPawthBalanceRaw = bscPawth ? bscPawth.balance : '0'
    const bscPawthBalance = bscPawth ? parseInt(bscPawthBalanceRaw) / 10**parseInt(bscPawth.decimals) : 0

    const ethPawthAddress = PAWTH_ADDRESS['0x1']
    const ethPawth = ethAssets ? ethAssets.find(a => a.token_address === ethPawthAddress) : []
    const ethPawthBalanceRaw = ethPawth ? ethPawth.balance : '0'
    const ethPawthBalance = ethPawth ? parseInt(ethPawthBalanceRaw) / 10**parseInt(ethPawth.decimals) : 0

    const multichainBalance = bscPawthBalance + ethPawthBalance

    const pawthBalanceByChain = {
      '0x1': ethPawthBalance,
      '0x38': bscPawthBalance,
    }

    globalContext.multichainEnabled ? setPawthBalance(multichainBalance) : setPawthBalance(pawthBalanceByChain[chainId])

  }, [globalContext.multichainEnabled, chainId, bscAssets, ethAssets])


  let rankIndex = ranks.findIndex(r => {
    return pawthBalance < r.threshold
  })

  let distanceToNextRank

  if (rankIndex === -1) {
    rankIndex = ranks.length - 2
    distanceToNextRank = 'The animals thank you'
  }

  const rank = ranks[rankIndex]
  const nextRank = ranks[rankIndex + 1]

  if (!distanceToNextRank) {
    distanceToNextRank = '+' + parseInt(rank.threshold - pawthBalance)
  }

  if (!account) {
    return (
      <div style={styles.card}>
        <div style={styles.header}>
          <h3>Your Pawther Rank</h3>
        </div>
        <div style={styles.row}>
          <Account />
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3>Your Pawther Rank</h3>
      </div>
      <Skeleton loading={!bscAssets || !ethAssets}>
        <div style={styles.row}>
          <img src={rank.img} alt={rank.name} style={styles.rankImg}/>
        </div>
        <div style={styles.row}>
          <strong>{rank.name}</strong>
        </div>
        <div style={styles.row}>
          <img src={nextRank.img} alt={nextRank.name} style={styles.nextRankImg}/>
        </div>
        <div style={styles.row}>
          Next Rank
        </div>
        <div style={styles.row}>
          <strong>{nextRank.name}</strong>
        </div>
        <div style={styles.row}>
          {distanceToNextRank}
        </div>
      </Skeleton>
    </div>
  );
}

export default Ranks