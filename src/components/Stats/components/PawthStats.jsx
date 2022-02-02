import { useEffect, useState } from "react";
import { useMoralis, useERC20Balances, useTokenPrice } from "react-moralis";
import Account from "../../Account/Account";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
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
  const [priceChange24h, setPriceChange24h] = useState(null)
  const [marketCapChange24h, setMarketCapChange24h] = useState(null)
  const CoinGeckoClient = new CoinGecko()

  useEffect(() => {
    getCoinGeckoData()

    async function getCoinGeckoData() {
      const coinGeckoData = await CoinGeckoClient.coins.fetch('pawthereum', {})
      const tokenData = coinGeckoData.data
      const marketCap = tokenData.market_data.market_cap.usd
      setMarketCap(marketCap)
      setMarketCapChange24h(tokenData.market_data.market_cap_change_percentage_24h)
      setPriceChange24h(tokenData.market_data.price_change_percentage_24h)
  
      const tokenLogo = tokenData.image.large
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
                value={'$' + price.toFixed(4) }
                style={{ marginBottom: '5px' }}
              />
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
          <Row gutter={16}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic
                title="24h"
                value={priceChange24h}
                precision={2}
                valueStyle={{ color: priceChange24h >= 0 ? '#3f8600' : '#cf1322' }}
                prefix={priceChange24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="%"
              />
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic
                title="24h"
                value={marketCapChange24h}
                precision={2}
                valueStyle={{ color: marketCapChange24h >= 0 ? '#3f8600' : '#cf1322' }}
                prefix={marketCapChange24h >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="%"
              />
            </Col>
          </Row>
        </Skeleton>
      </div>
    </div>
  );
}

export default PawthStats