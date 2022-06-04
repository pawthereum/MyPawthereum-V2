import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Input } from "antd";
import { DECIMALS, PAWTH_ADDRESS, STAKING_POOL } from '../../../constants';
import { CreditCardOutlined } from "@ant-design/icons";
import useStakingPool from 'hooks/useStakingPool'
import useAllowances from 'hooks/useAllowances';
import { Token, TokenAmount } from '@uniswap/sdk'

function PoolDeposit () {
  const { Moralis, chainId } = useMoralis()
  const { hasAllowance, updateAllowance } = useAllowances()
  const { deposit } = useStakingPool()
  const [depositAmount, setDepositAmount] = useState(null)
  const [isDepositDisabled, setIsDepositDisabled] = useState(true)
  const [isDepositLoading, setIsDepositLoading] = useState(false)
  const [allowanceButton, setAllowanceButton] = useState({
    display: false,
    isLoading: false,
    isActive: false,
    text: 'Approve'
  })

  const pawthToken = !chainId ? null : new Token(chainId, PAWTH_ADDRESS[chainId], DECIMALS, 'PAWTH', 'Pawthereum')

  async function tryDeposit () {
    if (!depositAmount) return
    setIsDepositLoading(true)
    await deposit(depositAmount)
    setDepositAmount(null)
    setIsDepositDisabled(true)
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
      const hasSufficientAllowance = await hasAllowance({
        amount: new TokenAmount(
          pawthToken,
          Moralis.Units.Token(depositAmount, DECIMALS)
        ),
        token: pawthToken,
        spender: STAKING_POOL[chainId]?.address
      })
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
    await updateAllowance({
      amount: new TokenAmount(
        pawthToken,
        Moralis.Units.Token(depositAmount, DECIMALS)
      ),
      token: pawthToken,
      spender: STAKING_POOL[chainId]?.address
    })
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
        <Col span={24}>
          <Input
            size="large"
            style={{
              width: "100%"
            }}
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
            disabled={isDepositDisabled || allowanceButton.display}
          >
            Deposit 💰
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PoolDeposit;