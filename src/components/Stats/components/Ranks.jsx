// import { useEffect, useStaste } from "react";
import { useMoralis, useERC20Balances } from "react-moralis";
import { PAWTH_ADDRESS } from '../../../constants'
import { Skeleton } from "antd";
import { ranks } from './ranks';

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
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

function Ranks(props) {
  const { data: assets } = useERC20Balances(props);
  const { chainId } = useMoralis();
  const pawthAddress = PAWTH_ADDRESS[chainId]
  const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : []
  const pawthBalanceRaw = pawth ? pawth.balance : '0'
  const pawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0

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

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Your Pawther Rank</h3>
        </div>
        <Skeleton loading={!assets}>
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
    </div>
  );
}

export default Ranks