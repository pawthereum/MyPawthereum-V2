import { useMoralis } from 'react-moralis'
import { Row, Col, Card, Divider } from 'antd'
import QueueAnim from 'rc-queue-anim'
import AppContext from '../../../AppContext'
import { useContext, useEffect, useState } from 'react'

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
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

  const formatMinAmount = (amt) => {
    const maxDigits = Number(amt) > 1 ? 0 : 6
    return Math.floor(amt).toLocaleString([], {
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
  }, [taxes, trade])

  useEffect(() => {
    console.log('got a trade', trade)
    if (!trade) return setShowTradeCard(false)
    if (trade?.amountIn === "0" && trade?.amountOut === 0) {
      setShowTradeCard(false)
    }
    if (trade.amountIn && trade.amountOut && trade.tokenIn && trade.tokenOut) {
      setShowTradeCard(true)
    }
  }, [trade])

  return (
    <Row style={{ marginTop: '10px' }}>
      <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
        <QueueAnim component="div" type={['top']}>
          { 
            !showTradeCard ? '' : 
            <Card style={styles.card} key='trade-card'>
              <Row style={styles.tradeCardRow}>
                <Col>Minimum received</Col>
                <Col>{`${formatMinAmount(trade.amountOutSlippage)} ${trade?.tokenOut?.symbol}`}</Col>
              </Row>
              <Row style={styles.tradeCardRow}>
                <Col>Price Impact</Col>
                <Col>{formatPriceImpact(trade.swap.priceImpact)}</Col>
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
