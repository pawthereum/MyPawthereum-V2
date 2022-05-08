import { useState, useEffect, useContext } from 'react'
import { Row, Col, Space, Button } from 'antd'
import AppContext from 'AppContext'
import { PAWSWAP } from '../../../constants'
import { networkConfigs } from 'helpers/networks'
import CurrencyPairForm from './CurrencyPairForm'
import useAllowances from 'hooks/useAllowances'
import { useMoralis } from 'react-moralis'
import { DEFAULT_SLIPPAGE } from '../../../constants'
import useLiquidity from 'hooks/useLiquidity'

const styles = {
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function AddLiquidity() {
  const { 
    estimatedSide, 
    inputCurrency, 
    outputCurrency, 
    trade, 
    executeSwap, 
    slippage, 
    inputAmount,
    highPriceImpactIgnored
  } = useContext(AppContext);

  const { chainId } = useMoralis()
  const { addLiquidity } = useLiquidity()
  const { hasAllowance, updateAllowance } = useAllowances()
  const [approvalIsLoading, setApprovalIsLoading] = useState(false)
  const [approvalText, setApprovalText] = useState('Approve')
  const [showApproveBtn, setShowApproveBtn] = useState(false)
  
  const tryAddLiquidity = async () => {
    const added = await addLiquidity()
    console.log({ added })
  }

  const approveInputAmount = async () => {
    setApprovalIsLoading(true)
    setApprovalText('Approving')

    await updateAllowance({
      amount: inputAmount,
      spender: PAWSWAP[chainId]?.address,
      token: inputCurrency
    })

    setApprovalIsLoading(false)
    setShowApproveBtn(false)
    setApprovalText('Approve')

    return true
  }

  useEffect(() => {
    if (!inputCurrency) return
    if (
      inputCurrency.address !== networkConfigs[chainId]?.wrapped &&
      inputAmount && 
      Number(inputAmount) > 0
    ) {
      checkAllowance()
    }
    async function checkAllowance () {
      const sufficientAllowance = await hasAllowance({
        amount: inputAmount,
        token: inputCurrency,
        spender: PAWSWAP[chainId]?.address
      })
      // show approve btn if there isnt a sufficient allowance
      setShowApproveBtn(!sufficientAllowance)
    }
  }, [inputCurrency, inputAmount])

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <CurrencyPairForm type="liquidity" />
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
              onClick={() => approveInputAmount()}
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
            style={{
              width: "100%",
              marginTop: `${slippage === DEFAULT_SLIPPAGE ? '15px' : '0px'}`,
              borderRadius: "0.6rem",
              height: "50px",
              ...styles.outset,
            }}
            onClick={() => tryAddLiquidity()}
          >
            Add Liquidity
          </Button>
        </Col>
      </Row>
    </Space>
  )
}

export default AddLiquidity;