import { useState } from 'react'
import { Row, Col, Card, Button } from 'antd';
import Settings from './Settings';
import AddLiquidity from './AddLiquidity';
import { ArrowLeftOutlined } from '@ant-design/icons';

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function Liquidity () {
  const [addLiquidityIsVisible, setAddLiquidityIsVisible] = useState(false)

  const showAddLiquidity = () => {
    console.log('showing...')
    setAddLiquidityIsVisible(true)
  }

  const hideAddLiquidity = () => {
    console.log('hiding...')
    setAddLiquidityIsVisible(false)
  }

  return (
    <Row>
      <Col>
        <Card style={styles.card} title={
          <Row>
            <Col span={12}>
              {
                !addLiquidityIsVisible ? '' :
                <ArrowLeftOutlined style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={() => hideAddLiquidity()} />
              }
              Liquidity
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
              <Settings />
            </Col>
          </Row>
        }>
          {
            !addLiquidityIsVisible
            ?
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: "0.6rem",
                  height: "50px",
                  ...styles.outset,
                }}
                onClick={() => showAddLiquidity()}
              >
                Add Liquidity
              </Button>
            :
              <AddLiquidity />
          }
        </Card>
      </Col>
    </Row>
  )
}

export default Liquidity;