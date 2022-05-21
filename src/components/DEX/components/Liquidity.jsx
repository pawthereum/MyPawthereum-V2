import { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'antd';
import Settings from './Settings';
import AddLiquidity from './AddLiquidity';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ListLiquidity from './ListLiquidity';
import RemoveLiquidity from './RemoveLiquidity';
import useLiquidity from 'hooks/useLiquidity';

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function Liquidity () {  
  const { showRemoveLiquidity } = useLiquidity()
  const [removeLiquidityIsVisible, setRemoveLiquidityIsVisible] = useState(false)
  const [addLiquidityIsVisible, setAddLiquidityIsVisible] = useState(false)

  useEffect(() => {
    console.log('showRemoveLiquidity', showRemoveLiquidity)
    setRemoveLiquidityIsVisible(showRemoveLiquidity)
  }, [showRemoveLiquidity])

  const showAddLiquidity = () => {
    console.log('showing...')
    setAddLiquidityIsVisible(true)
  }

  const hideAddLiquidity = () => {
    console.log('hiding...')
    setAddLiquidityIsVisible(false)
  }

  // const showRemoveLiquidity = () => {
  //   console.log('showing...')
  //   setRemoveLiquidityIsVisible(true)
  // }

  const hideRemoveLiquidity = () => {
    console.log('hiding...')
    setRemoveLiquidityIsVisible(false)
  }

  return (
    <Row>
      <Col>
        <Card style={styles.card} title={
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={!addLiquidityIsVisible && !removeLiquidityIsVisible ? 12  : 8 }>
              {
                !addLiquidityIsVisible && !removeLiquidityIsVisible ? `Liquidity ${showRemoveLiquidity}` :
                <ArrowLeftOutlined style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={() => {
                  hideAddLiquidity()
                  hideRemoveLiquidity()
                }} />
              }
            </Col>
            {
              !addLiquidityIsVisible ? '' :
              <Col span={8}>
                Add Liquidity
              </Col>
            }
            {
              !removeLiquidityIsVisible ? '' :
              <Col span={8}>
                Remove Liquidity
              </Col>
            }
            <Col span={!addLiquidityIsVisible && !removeLiquidityIsVisible ? 12  : 8 } style={{ display: 'flex', justifyContent: 'end' }}>
              <Settings />
            </Col>
          </Row>
        }>
          {
            !removeLiquidityIsVisible ? '' :
            <RemoveLiquidity />
          }
          {
            !addLiquidityIsVisible
            ?
              <>
                <Row>
                  <Col span={24}>
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
                  </Col>
                </Row>
                <ListLiquidity />
              </>
            :
              <AddLiquidity />
          }
        </Card>
      </Col>
    </Row>
  )
}

export default Liquidity;