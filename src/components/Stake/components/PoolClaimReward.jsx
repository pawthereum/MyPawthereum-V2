import { useState } from 'react'
import { Row, Col, Button } from "antd";
import useStakingPool from 'hooks/useStakingPool'

function PoolClaimReward (props) {
  const [isClaimLoading, setIsClaimLoading] = useState(false)
  const [isCompoundLoading, setIsCompoundLoading] = useState(false)
  const { claimReward, compound } = useStakingPool()

  async function tryClaim () {
    setIsClaimLoading(true)
    await claimReward()
    setIsClaimLoading(false)
  }

  async function tryCompound () {
    setIsCompoundLoading(true)
    await compound({ type: 'reward' })
    setIsCompoundLoading(false)
  }

  return (
    <div>
      <Row gutter={6}>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "0.6rem",
              height: "50px",
            }}
            onClick={() => tryCompound()}
            loading={isCompoundLoading}
            disabled={props.isClaimDisabled}
          >
            Compound 📚
          </Button>
        </Col> 
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "0.6rem",
              height: "50px",
            }}
            onClick={() => tryClaim()}
            loading={isClaimLoading}
            disabled={props.isClaimDisabled}
          >
            Claim 🤑
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PoolClaimReward;