import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Input } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import useStakingPool from 'hooks/useStakingPool'
import useBreakpoint from 'hooks/useBreakpoint';


function PoolDeposit () {
  const { chainId } = useMoralis()
  const { deposit, hasAllowance, updateAllowance } = useStakingPool()
  const [depositAmount, setDepositAmount] = useState(null)
  const [isDepositDisabled, setIsDepositDisabled] = useState(true)
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [allowanceButton, setAllowanceButton] = useState({
    display: false,
    isLoading: false,
    isActive: false,
    text: 'Approve'
  })

  async function tryDeposit () {
    if (!depositAmount) return
    setIsDepositLoading(true)
    const depositReq = await deposit(depositAmount)
    console.log('dr', depositReq)
    setDepositAmount(null)
    setAllowanceButton({
      display: false,
      isLoading: false,
      isActive: false,
      text: `Approve`
    })
    setIsDepositLoading(false)
  }

  useEffect(() => {
    if (!depositAmount) return
    setIsDepositDisabled(false)
  }, [depositAmount])

  useEffect(() => {
    if (!chainId) return

    if (depositAmount) {
      checkHasSufficientAllowance()
    }

    async function checkHasSufficientAllowance() {
      if (!depositAmount) {
        return setAllowanceButton({
          display: false,
          isLoading: false,
          isActive: false,
          text: `Approve`
        })
      }
      const hasSufficientAllowance = await hasAllowance(depositAmount)
      if (!hasSufficientAllowance) {
        return setAllowanceButton({
          display: true,
          isLoading: false,
          isActive: depositAmount,
          text: `Approve`
        })
      }
      return setAllowanceButton({
        display: false,
        isLoading: false,
        isActive: false,
        text: `Approve`
      })
    }
  }, [chainId, depositAmount])

  async function attemptAllowance () {
    setAllowanceButton({
      display: true,
      isActive: false,
      isLoading: true,
      text: `Approving`
    })
    await updateAllowance(depositAmount)
    return setAllowanceButton({
      display: false,
      isActive: false,
      isLoading: false,
      text: 'Approve'
    })
  }

  return (
    <div>
      <Row>
        <Col>
          <Input
            size="large"
            placeholder="Deposit Amount"
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setDepositAmount(`${e.target.value}`);
            }}
          />
        </Col>
      </Row>
      <Row gutter={6}>
        {
          !allowanceButton.display ? '' :
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
              onClick={() => attemptAllowance()}
              disabled={!allowanceButton.isActive}
              loading={allowanceButton.isLoading}
            >
              {allowanceButton.text}
            </Button>
          </Col>
        }
        <Col span={allowanceButton.display ? 12 : 24}> 
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "0.6rem",
              height: "50px",
            }}
            onClick={() => tryDeposit()}
            loading={isDepositLoading}
            disabled={isDepositDisabled}
          >
            Deposit 💰
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PoolDeposit;