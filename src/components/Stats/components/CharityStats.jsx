import { useMoralis, useTokenPrice } from "react-moralis";
import { PAWTH_ADDRESS, DECIMALS } from '../../../constants'
import { Alert, Divider, Row, Col, Statistic } from "antd";
import { useEffect, useState } from "react";
import CharityTransactions from '../components/CharityTransactions';

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
};

function CharityStats(props) {
  const { Moralis } = useMoralis()

  const [tokensCollected, setTokensCollected] = useState(0)
  const [usdValueCollected, setUsdValueCollected] = useState(0)

  const { data: priceData } = useTokenPrice({
    address: PAWTH_ADDRESS[props.chainId] || PAWTH_ADDRESS['0x1'],
    chain: getChainNameById(props.chainId || '0x1')
  })

  const price = priceData ? priceData.usdPrice : 0

  useEffect(() => {
    setUsdValueCollected(tokensCollected * price)
  }, [tokensCollected, price])

  useEffect(() => {
    makeTokenTransactionsReq()

    async function makeTokenTransactionsReq() {
      const options = { 
        chain: props.chainId, 
        address: props.charityWallet,
        to_date: new Date().getTime(),
        from_date: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) // this time 24h ago
      };
      const transfers = await Moralis.Web3API.account.getTokenTransfers(options)
      if (!transfers || !transfers.result) return []
      const transfersToCharity = transfers.result.filter(t => t.to_address === props.charityWallet.toLowerCase())
      const tokenAmount = transfersToCharity.map(t => Moralis.Units.FromWei(t.value, DECIMALS)).reduce((prev, current) => prev + current, 0)
      setTokensCollected(tokenAmount)
    }
  }, [props])


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

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Charity Wallet</h3>
        </div>
        <Row gutter={16}>
        {
          getChainNameById(props.chainId) === 'bsc' ?
          <Alert
            message="$PAWTH on BSC takes charity taxes in BNB. We do not currently track those transactions here."
            type="info"
            closable
            style={{ margin: '15px', marginTop: '0px' }}
          /> : ''
        }
          <Col span={12} style={{ textAlign: 'center' }}>
            <Statistic 
              title="$PAWTH Collected Last 24h" 
              value={tokensCollected.toLocaleString([], { 
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}/>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Statistic 
              title="USD Value Collected Last 24h" 
              value={'$' + usdValueCollected.toLocaleString([], { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}/>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: '10px' }}>
            <Divider orientation="left">Transaction History</Divider>
            <CharityTransactions chainId={props.chainId} charityWallet={props.charityWallet} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CharityStats