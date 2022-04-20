import { useEffect, useState } from 'react'
import { Row, Col, Button, Input } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import useStakingPool from 'hooks/useStakingPool'

function PoolWithdraw () {
  const { withdraw } = useStakingPool()
  const [withdrawAmount, setWithdrawAmount] = useState(null)
  const [isWithdrawDisabled, setIsWithdrawDisabled] = useState(true)
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false)

  async function tryWithdraw () {
    if (!withdrawAmount) return
    setIsWithdrawLoading(true)
    await withdraw(withdrawAmount)
    setWithdrawAmount(null)
    setIsWithdrawLoading(false)
  }

  useEffect(() => {
    if (!withdrawAmount) return
    setIsWithdrawDisabled(false)
  }, [withdrawAmount])

  return (
    <div>
      <Row>
        <Col span={24}>
          <Input
            size="large"
            style={{
              width: "100%"
            }}
            placeholder="Withdraw Amount"
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setWithdrawAmount(`${e.target.value}`);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}> 
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "0.6rem",
              height: "50px",
            }}
            onClick={() => tryWithdraw()}
            loading={isWithdrawLoading}
            disabled={isWithdrawDisabled}
          >
            Withdraw ✌️
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PoolWithdraw;