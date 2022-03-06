import { useContext, useEffect, useState } from "react";
import { useMoralis, useERC20Balances, useTokenPrice } from "react-moralis";
import Account from "../../Account/Account";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { PAWTH_ADDRESS, COINGECKO_ID } from '../../../constants'
import { Row, Col, Statistic, Skeleton } from "antd";
import AppContext from '../../../AppContext'
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

function PawthStats() {
  const globalContext = useContext(AppContext);

  const { data: bscAssets } = useERC20Balances({ chain: '0x38' });
  const { data: ethAssets } = useERC20Balances({ chain: '0x1' });
  const { data: assets } =  useERC20Balances();

  const bscPawthAddress = PAWTH_ADDRESS['0x38']
  const { data: bscPriceData } = useTokenPrice({
    address: bscPawthAddress,
    chain: '0x38'
  })
  const ethPawthAddress = PAWTH_ADDRESS['0x1']
  const { data: ethPriceData } = useTokenPrice({
    address: ethPawthAddress,
    chain: '0x1'
  })

  const [pawthBalance, setPawthBalance] = useState(0)

  const { account, chainId } = useMoralis();
  const [logo, setLogo] = useState(null)
  const [usdValue, setUsdValue] = useState(0)
  const [price, setPrice] = useState(0)

  const [marketCap, setMarketCap] = useState(0)
  const [priceChange24h, setPriceChange24h] = useState(null)
  const [marketCapChange24h, setMarketCapChange24h] = useState(null)
  const CoinGeckoClient = new CoinGecko()

  useEffect(() => {
    // bsc
    const bscPawth = bscAssets ? bscAssets.find(a => a.token_address === bscPawthAddress) : []
    const bscPawthBalanceRaw = bscPawth ? bscPawth.balance : '0'
    const bscPawthBalance = bscPawth ? parseInt(bscPawthBalanceRaw) / 10**parseInt(bscPawth.decimals) : 0
    const bscUsdValue = bscPriceData ? bscPriceData.usdPrice * bscPawthBalance : 0

    // eth
    const ethPawth = ethAssets ? ethAssets.find(a => a.token_address === ethPawthAddress) : []
    const ethPawthBalanceRaw = ethPawth ? ethPawth.balance : '0'
    const ethPawthBalance = ethPawth ? parseInt(ethPawthBalanceRaw) / 10**parseInt(ethPawth.decimals) : 0
    const ethUsdValue = ethPriceData ? ethPriceData.usdPrice * ethPawthBalance : 0

    // current chain
    const pawthAddress = PAWTH_ADDRESS[chainId]
    const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
    const pawthBalanceRaw = pawth ? pawth.balance : '0'
    const pawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0

    const multichainBalance = bscPawthBalance + ethPawthBalance

    const chainData = {
      '0x1': {
        balance: ethPawthBalance,
        usdValue: ethUsdValue, // val of balance
        price: ethPriceData?.usdPrice || 0
      },
      '0x38': {
        balance: bscPawthBalance,
        usdValue: bscUsdValue,
        price: bscPriceData?.usdPrice || 0
      }
    }

    if (globalContext.multichainEnabled) {
      setPawthBalance(multichainBalance)
      setUsdValue(bscUsdValue + ethUsdValue)
      setPrice((chainData['0x1'].price + chainData['0x38'].price) / 2) // avg price
      return
    }

    setPawthBalance(chainData[chainId]?.balance || pawthBalance)
    setUsdValue(chainData[chainId]?.usdValue || 0)
    setPrice(chainData[chainId]?.price || 0)

  }, [globalContext.multichainEnabled, chainId, bscAssets, ethAssets, bscPriceData, ethPriceData])

  useEffect(() => {
    getCoinGeckoData()

    async function getCoinGeckoData() {
      const coinGeckoData = await CoinGeckoClient.coins.fetch(COINGECKO_ID, {})
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
        <Skeleton loading={!bscAssets || !ethAssets}>
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