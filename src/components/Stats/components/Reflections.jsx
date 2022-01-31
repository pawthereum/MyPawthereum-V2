import { useMoralis, useERC20Balances, useTokenPrice } from "react-moralis";
import Account from "../../Account/Account";
import { useERC20Transfers } from "hooks/useERC20Transfers";
import { PAWTH_ADDRESS } from '../../../constants'
import { Skeleton } from "antd";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "10px",
    paddingBottom: "20px",
  },
  body: {
    textAlign: "center",
  },
  logo: {
    padding: "10px",
    height: "100px",
    width: "100px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    flexDirection: "row",
    paddingBottom: "10px",
  },
  rowWithColumns: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
    gap: "10px",
    flexDirection: "row",
    paddingBottom: "10px",
    maxWidth: '90%',
    paddingLeft: '10%'
  },
};

function Reflections(props) {
  const { data: assets } = useERC20Balances(props);
  const { ERC20Transfers } = useERC20Transfers();
  const { account, chainId } = useMoralis();
  
  const pawthAddress = PAWTH_ADDRESS[chainId]
  
  const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
  const pawthBalanceRaw = pawth ? pawth.balance : '0'
  const pawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0

  const pawthTransactions = ERC20Transfers ? ERC20Transfers.filter(t => t.address === pawthAddress) : []

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

  const { data: priceData } = useTokenPrice({
    address: pawthAddress || PAWTH_ADDRESS['0x1'],
    chain: getChainNameById(chainId)
  })

  const price = priceData ? priceData.usdPrice : 0

  let totalIn = 0.0, totalOut = 0.0

  const startBlockReflectionsOff = 13690729
  const endBlockReflectionsOff = 13953541
  const startBlockReflectionsOnePercent = endBlockReflectionsOff
  
  const isEth = chainId === '0x1'

  const isEthReflectionsOnePercent = (tx) => {
    const reflectionsOnePercent = parseInt(tx.block_number) >= startBlockReflectionsOnePercent
    return isEth && reflectionsOnePercent
  }

  const isEthReflectionsOff = (tx) => {
    const reflectionsOff = parseInt(tx.block_number) > startBlockReflectionsOff &&
                           parseInt(tx.block_number) <= endBlockReflectionsOff
    return isEth && reflectionsOff
  }


  for (const tx of pawthTransactions) {
    if (tx.to_address === account) {
      totalIn += parseFloat(tx.value)
    } else if (isEthReflectionsOnePercent(tx)) {
      totalOut += parseFloat(tx.value)
      totalOut += parseFloat(tx.value) * 0.01
    } else if (isEthReflectionsOff(tx)) {
      totalOut += parseFloat(tx.value)
    } else {
      totalOut += parseFloat(tx.value)
      totalOut += parseFloat(tx.value) * 0.02
    }
  }

  totalIn = totalIn / 10**9
  totalOut = totalOut / 10**9

  let balanceWithoutReflections = totalIn - totalOut
  const reflections = pawthBalance ? parseInt(pawthBalance - balanceWithoutReflections) : 0
  
  if (balanceWithoutReflections < 0) {
    balanceWithoutReflections = 0
  }

  if (!account) {
    return (
      <div style={styles.card}>
        <div style={styles.tranfer}>
          <div style={styles.header}>
            <h3>Your $PAWTH Reflections</h3>
          </div>
          <div style={styles.row}>
            <Account />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Your $PAWTH Reflections</h3>
        </div>
        <Skeleton loading={!ERC20Transfers}>
          <div style={styles.rowWithColumns}>
            <div>
              Total $PAWTH In
              <br/>
              <strong>
                {totalIn.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </strong>
            </div>
            <div>            
              Total $PAWTH Out
              <br/>
              <strong>
                {totalOut.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </strong>
            </div>
          </div>
          <div style={styles.rowWithColumns}>
            <div>
              $PAWTH Reflections Earned
              <br/>
              <strong>
                {reflections.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </strong>
            </div>
            <div>            
              $PAWTH Reflections USD Value
              <br/>
              <strong>
                {'$' + (reflections * price).toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })}
              </strong>
            </div>
          </div>
          <div style={styles.rowWithColumns}>
            <div>
              $PAWTH Balance Without Reflections
              <br/>
              <strong>
                {balanceWithoutReflections.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </strong>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default Reflections