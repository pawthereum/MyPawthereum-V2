import { useMoralis } from 'react-moralis'
import { Row, Col, Card, Divider } from 'antd'
import QueueAnim from 'rc-queue-anim'
import AppContext from '../../../AppContext'
import { useContext, useEffect, useState } from 'react'
import { COLORS, HIGH_PRICE_IMPACT } from '../../../constants'

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "350px",
    fontSize: "13px",
    fontWeight: "500",
  },
  tradeCardRow: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}

function TradeCard () {
  const { Moralis } = useMoralis()
  const [showTradeCard, setShowTradeCard] = useState(false)
  const { trade, taxes, tokenTaxContractFeeDecimal, priceImpact } = useContext(AppContext);
  const [totalTax, setTotalTax] = useState(0)
  const [formattedTaxes, setFormattedTaxes] = useState(null)
  const [highPriceImpact, setHighPriceImpact] = useState(false)
  const [estimateSideText, setEstimatedSideText] = useState(null)
  const [estimatedSideAmount, setEstimatedSideAmount] = useState(null)
  const [estimatedSideToken, setEstimatedSideToken] = useState(null)

  const formatEstimatedAmount = (amt) => {
    if (!amt) return 0
    const maxDigits = Number(amt) > 0 ? 4 : estimatedSideToken.decimals
    
    return amt.toLocaleString([], {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDigits
    })
  }

  const formatPriceImpact = (amt) => {
    const impact = amt.toSignificant(4)
    return impact + '%'
  }

  const formatTax = (tax) => {
    return tax / 10**tokenTaxContractFeeDecimal + '%'
  }

  useEffect(() => {
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    if (!taxes || taxes.length === 0) return
    if (!trade?.side) return
    const totalTax = taxes.reduce((p, t) => {
      if (!t[trade.side]) return p + 0
      return p + Number(t[trade.side])
    }, 0)
    setTotalTax(totalTax)
    const formattedTaxes = taxes.filter(t => {
      return Number(t[trade.side]) !== 0
    }).map(t => {
      return {
        name: t.name,
        amount: formatTax(Number(t[trade.side]))
      }
    })
    setFormattedTaxes(formattedTaxes)

    trade?.estimatedSide === 'output'
      ? setEstimatedSideText('Minimum received')
      : setEstimatedSideText('Maximum spent')
    
    trade?.estimatedSide === 'output'
      ? setEstimatedSideToken(trade.swap.outputAmount.token)
      : setEstimatedSideToken(trade.swap.inputAmount.token)

      console.log('trade', trade.swap)
    const minAmountDecimals = trade?.estimatedSide === 'output'
      ? trade.swap.outputAmountSlippage.token.decimals
      : trade.swap.inputAmountSlippage.token.decimals

    trade?.estimatedSide === 'output'
      ? setEstimatedSideAmount(Moralis.Units.FromWei(BigNumber.from(trade.swap.outputAmountSlippage.raw.toString()), minAmountDecimals))
      : setEstimatedSideAmount(Moralis.Units.FromWei(BigNumber.from(trade.swap.inputAmountSlippage.raw.toString()), minAmountDecimals))

    trade?.swap?.priceImpact.toSignificant() > HIGH_PRICE_IMPACT 
      ? setHighPriceImpact(true) 
      : setHighPriceImpact(false)
    
  }, [taxes, trade])

  useEffect(() => {
    console.log('got a trade', trade)
    if (!trade) return setShowTradeCard(false)
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    const outputGtZero = () => {
      const outputAmt = BigNumber.from(trade?.swap?.outputAmount.raw.toString())
      return outputAmt.gt(BigNumber.from(0))
    }
    const inputGtZero = () => {
      const inputAmt = BigNumber.from(trade?.swap?.inputAmount.raw.toString())
      return inputAmt.gt(BigNumber.from(0))
    }
    if (!inputGtZero() || !outputGtZero()) {
      return setShowTradeCard(false)
    }
    return setShowTradeCard(true)
  }, [trade])

  return (
    <Row style={{ marginTop: '10px' }}>
      <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
        <QueueAnim component="div" type={['top']}>
          { 
            !showTradeCard ? '' : 
            <Card style={styles.card} key='trade-card'>
              <Row style={styles.tradeCardRow}>
                <Col>{estimateSideText}</Col>
                <Col>{`${formatEstimatedAmount(estimatedSideAmount)} ${estimatedSideToken?.symbol}`}</Col>
              </Row>
              <Row style={styles.tradeCardRow}>
                <Col>Price Impact</Col>
                <Col style={{
                  color: highPriceImpact ? COLORS.error : ''
                }}>{formatPriceImpact(trade.swap.priceImpact)}</Col>
              </Row>
              <Divider></Divider>
              <Row style={{ ...styles.tradeCardRow, fontSize: '1rem' }}>
                <Col><strong>Total Tax</strong></Col>
                <Col><strong>{formatTax(totalTax)}</strong></Col>
              </Row>
              {
                formattedTaxes ? formattedTaxes.map(t =>
                  <Row style={styles.tradeCardRow} key={t.name}>
                    <Col>{t?.name}</Col>
                    <Col>{t.amount}</Col>
                  </Row>
                ) : ''
              }
            </Card>
          }
        </QueueAnim>
      </Col>
    </Row>
  )
}

export default TradeCard;
