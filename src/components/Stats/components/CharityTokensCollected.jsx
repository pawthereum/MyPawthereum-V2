
import { useMoralisQuery } from "react-moralis";
import { PAWTH_ADDRESS } from '../../../constants'
import { useEffect, useState } from "react";
import { networkConfigs } from "helpers/networks";
import { Alert, Row, Col, Statistic, Skeleton } from "antd";

function CharityTokensCollected(props) {
  const [tokensCollected, setTokensCollected] = useState(0)
  const [usdValueCollected, setUsdValueCollected] = useState(0)

  const chainCurrencySymbol = networkConfigs[props.chainId]?.currencySymbol

  const table = chainCurrencySymbol === 'BNB' ? 'BscTokenTransfers' : 'EthTokenTransfers'
  const { data, error, isLoading } = useMoralisQuery(table, query =>
    query
      .greaterThan("block_timestamp", props.timeFrame)
      .equalTo("token_address", PAWTH_ADDRESS[props.chainId] ? PAWTH_ADDRESS[props.chainId].toLowerCase() : '')
      .equalTo("to_address", props.charityWallet ? props.charityWallet.toLowerCase() : ''),
      [props.charityWallet, props.chainId, props.timeFrame]
  );

  useEffect(() => {
    if (!data) return
    setTokensCollected(data.reduce((p, c) => {
      return p + parseFloat(c.attributes.decimal.value.$numberDecimal)
    }, 0))
  }, [data])

  useEffect(() => {
    setUsdValueCollected(tokensCollected * props.tokenPrice)
  }, [tokensCollected, props.tokenPrice])

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
          title={`$PAWTH Collected Last ${props.timeFrameTitle}`}
          value={tokensCollected.toLocaleString([], { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
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

export default CharityTokensCollected