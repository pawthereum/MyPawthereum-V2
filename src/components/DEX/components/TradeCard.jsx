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
  const [showTradeCard, setShowTradeCard] = useState(false)
  const { trade } = useContext(AppContext);

  const formatAmount = (amt) => {
    const maxDigits = Number(amt) > 1 ? 0 : 6
    return amt.toLocaleString([], {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDigits
    })
  }

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
                <Col>{`${formatAmount(trade.amountOut)} ${trade?.tokenOut?.symbol}`}</Col>
              </Row>
              <Divider></Divider>
              <Row style={styles.tradeCardRow}>
                <Col>Total Tax</Col>
                <Col>50%</Col>
              </Row>
            </Card>
          }
        </QueueAnim>
      </Col>
    </Row>
  )
}

export default TradeCard;
