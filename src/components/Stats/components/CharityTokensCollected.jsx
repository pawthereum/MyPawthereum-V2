
import { useTokenPrice, useMoralisQuery } from "react-moralis";
import { PAWTH_ADDRESS } from '../../../constants'
import { useEffect, useState } from "react";
import { Alert, Row, Col, Statistic, Skeleton } from "antd";

function CharityTokensCollected(props) {
  const [tokensCollected, setTokensCollected] = useState(0)
  const [usdValueCollected, setUsdValueCollected] = useState(0)

  const { data: priceData } = useTokenPrice({
    address: PAWTH_ADDRESS[props.chainId] || PAWTH_ADDRESS['0x1'],
    chain: getChainNameById(props.chainId || '0x1')
  })

  const price = priceData ? priceData.usdPrice : 0

  const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) // this time 24h ago 
  const table = props.chainId === '0x38' || props.chainid === '0x64' ? 'BscTokenTransfers' : 'EthTokenTransfers'
  const { data, error, isLoading } = useMoralisQuery(table, query =>
    query
      .greaterThan("block_timestamp", oneDayAgo)
      .equalTo("token_address", PAWTH_ADDRESS[props.chainId] ? PAWTH_ADDRESS[props.chainId].toLowerCase() : '')
      .equalTo("to_address", props.charityWallet ? props.charityWallet.toLowerCase() : '')
  );

  useEffect(() => {
    if (!data) return
    setTokensCollected(data.reduce((p, c) => {
      return p + parseFloat(c.attributes.decimal.value.$numberDecimal)
    }, 0))
  }, [data])


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
    setUsdValueCollected(tokensCollected * price)
  }, [tokensCollected, price])

  if (isLoading) return (<Skeleton></Skeleton>)
  if (error) return (
    <Alert
      message="There was a problem fetching the Charity Wallet data" 
      type="error"
    ></Alert>
  )

  return (
    <Row gutter={16}>
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
  )
}

export default CharityTokensCollected