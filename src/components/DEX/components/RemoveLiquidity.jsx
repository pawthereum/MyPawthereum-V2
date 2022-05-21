import { useState } from 'react'
import { Slider, Statistic, Row, Col, Space, Button } from 'antd'
import { DEFAULT_SLIPPAGE } from '../../../constants'
import useAllowances from 'hooks/useAllowances'
import useLiquidity from 'hooks/useLiquidity'

const styles = {
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function RemoveLiquidity() {
  const { hasAllowance, updateAllowance } = useAllowances()
  const { getPairTotalSupply } = useLiquidity()
  const [percentage, setPercentage] = useState(0)
  const [approvalIsLoading, setApprovalIsLoading] = useState(false)
  const [approvalText, setApprovalText] = useState('Approve')
  const [showApproveBtn, setShowApproveBtn] = useState(false)

  const onPercentageChange = value => {
    setPercentage(value)
  }

  const tryRemoveLiquidity = async() => {
    
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Statistic title="Amount" value={percentage} suffix="%" precision={0} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Slider
            min={0}
            max={100}
            onChange={onPercentageChange}
            tipFormatter={v => v + '%'}
            value={typeof percentage === 'number' ? percentage : 0}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[25, 50, 75, 100].map(p => {
            return (
              <Button key={p} type={percentage === p ? 'primary' : ''} shape="round" size="large" onClick={() => setPercentage(p)}>
                {p}%
              </Button>
            )
          })}          
        </Col>
      </Row>
      <Row gutter={6}>
        {
          !showApproveBtn ? '' :
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "0.6rem",
                height: "50px",
                ...styles.outset,
              }}
              // onClick={() => approveInputAmount()}
              loading={approvalIsLoading}
            >
              {approvalText}
            </Button>
          </Col>
        }
        <Col span={showApproveBtn ? 12 : 24}>
          <Button
            type="primary"
            size="large"
            disabled={showApproveBtn}
            style={{
              width: "100%",
              borderRadius: "0.6rem",
              height: "50px",
              ...styles.outset,
            }}
            // onClick={() => tryRemoveLiquidity()}
          >
            Remove Liquidity
          </Button>
        </Col>
      </Row>
    </Space>
  )
}

export default RemoveLiquidity;