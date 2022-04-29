
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import { Alert, Row, Col, Statistic, Skeleton } from "antd";
import { networkConfigs } from "helpers/networks";

function CharityEthCollected(props) {
  const { Moralis } = useMoralis()

  const [wethCollected, setWethCollected] = useState(0)
  const [usdValueCollected, setUsdValueCollected] = useState(0)

  // const WETH_ADDRESS = !props.chainId ? null : networkConfigs[props.chainId].wrapped

  // const { data: priceData } = useTokenPrice({
  //   address: WETH_ADDRESS,
  //   chain: getChainNameById(props.chainId || '0x38')
  // })
  // const price = priceData ? priceData.usdPrice : 0

  const currencySymbol = !props.chainId ? '...' : networkConfigs[props.chainId].currencySymbol

  const table = props.chainId === '0x38' || props.chainid === '0x61' ? 'SwapAndLiquifyBsc' : 'SwapAndLiquifyEth'
  const { data, error, isLoading } = useMoralisQuery(table, query =>
    query.greaterThan("block_timestamp", props.timeFrame),
    [props.timeFrame]
  );

  useEffect(() => {
    if (!data) return
    setWethCollected(data.reduce((p, c) => {
      return p + Number(Moralis.Units.FromWei(c.attributes.ethForCharity))
    }, 0))
  }, [data])

  useEffect(() => {
    setUsdValueCollected(wethCollected * props.wethPrice)
  }, [wethCollected, props.wethPrice])

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
          title={`${currencySymbol} Collected Last ${props.timeFrameTitle}`}
          precision={4}
          value={wethCollected.toLocaleString([], { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 4
          })}/>
      </Col>
      <Col span={12} style={{ textAlign: 'center' }}>
        <Statistic 
          title={`USD Value Collected Last ${props.timeFrameTitle}`}
          value={'$' + usdValueCollected.toLocaleString([], { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}/>
      </Col>
    </Row>
  )
}

export default CharityEthCollected