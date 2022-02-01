import { useEffect, useState } from "react";
import { useMoralis, useERC20Balances, useTokenPrice } from "react-moralis";
import Account from "../../Account/Account";
import { PAWTH_ADDRESS } from '../../../constants'
import { Row, Col, Statistic, Skeleton } from "antd";
const CoinGecko = require('coingecko-api')

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
  logo: {
    padding: "10px",
    height: "100px",
    width: "100px",
    margin: "0 auto"
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

function PawthStats(props) {
  const { data: assets } = useERC20Balances(props);
  const { account, chainId } = useMoralis();
  const [logo, setLogo] = useState(null)
  const pawthAddress = PAWTH_ADDRESS[chainId]
  const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
  const pawthBalanceRaw = pawth ? pawth.balance : '0'
  const pawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0
  const [marketCap, setMarketCap] = useState(0)
  const CoinGeckoClient = new CoinGecko()

  useEffect(() => {
    getCoinGeckoData()

    async function getCoinGeckoData() {
      const coinGeckoData = await CoinGeckoClient.coins.markets({ ids: ['pawthereum'] })
      const tokenData = coinGeckoData.data.find(d => d.id === 'pawthereum')
      const marketCap = tokenData.market_cap
      console.log('tokenData', tokenData)
      setMarketCap(marketCap)
  
      const tokenLogo = tokenData.image
      setLogo(tokenLogo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let price = 0, usdValue = 0

  const { data: priceData } = useTokenPrice({
    address: pawthAddress || PAWTH_ADDRESS['0x1'],
    chain: getChainNameById(chainId)
  })

  if (priceData) {
    price = priceData.usdPrice
    usdValue = pawthBalance * price
    // marketCap = price * TOTAL_SUPPLY
  }

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

  if (!account) {
    return (
      <div style={styles.card}>
        <div style={styles.tranfer}>
          <div style={styles.header}>
            <h3>Your Wallet</h3>
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
          <h3>Your Wallet</h3>
        </div>
        <Skeleton loading={!assets}>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'center', justifyContent: 'center' }}>
              <div>
                {
                  !logo ? <Skeleton.Image style={styles.logo} /> : <img alt="Logo" src={logo} style={styles.logo} />
                }
              </div>

            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Statistic
                title="Your $PAWTH Balance" 
                value={parseInt(pawthBalance).toLocaleString()}/>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Your $PAWTH USD Value" 
                value={'$' + usdValue.toLocaleString([], { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}/>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Price" 
                value={'$' + price.toFixed(4) }/>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Market Cap" 
                value={'$' + marketCap.toLocaleString([], { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}/>
            </Col>
          </Row>
        </Skeleton>
      </div>
    </div>
  );
}

export default PawthStats