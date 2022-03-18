
import { useMoralis, useTokenPrice, useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import { Alert, Row, Col, Statistic, Skeleton } from "antd";
import { networkConfigs } from "helpers/networks";

function CharityEthCollected(props) {
  const { Moralis } = useMoralis()

  const [wethCollected, setWethCollected] = useState(0)
  const [usdValueCollected, setUsdValueCollected] = useState(0)

  const WETH_ADDRESS = !props.chainId ? null : networkConfigs[props.chainId].wrapped

  const { data: priceData } = useTokenPrice({
    address: WETH_ADDRESS,
    chain: getChainNameById(props.chainId || '0x38')
  })
  const price = priceData ? priceData.usdPrice : 0

  const currencySymbol = !props.chainId ? '...' : networkConfigs[props.chainId].currencySymbol

  const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) // this time 24h ago
  const table = props.chainId === '0x38' || props.chainid === '0x64' ? 'SwapAndLiquifyBsc' : 'SwapAndLiquifyEth'
  const { data, error, isLoading } = useMoralisQuery(table, query =>
    query.greaterThan("block_timestamp", oneDayAgo)
  );

  console.log('data', data)
  
  useEffect(() => {
    if (!data) return
    setWethCollected(data.reduce((p, c) => {
      return p + Moralis.Units.FromWei(c.attributes.ethForCharity)
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
    setUsdValueCollected(wethCollected * price)
  }, [wethCollected, price])

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
          title={`${currencySymbol} Collected Last 24h`}
          value={wethCollected.toLocaleString([], { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 4
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

export default CharityEthCollected