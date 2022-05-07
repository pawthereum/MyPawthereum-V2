import { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Card } from 'antd'
import AppContext from 'AppContext'
import { useMoralis } from 'react-moralis'
import TradeCard from './TradeCard';
import Settings from './Settings'
import { PAWSWAP, DEFAULT_SLIPPAGE, COLORS, HIGH_PRICE_IMPACT, MAXMIMUM_PRICE_IMPACT } from '../../../constants'
import useAllowances from 'hooks/useAllowances.js';
import { networkConfigs } from 'helpers/networks.js';
import CurrencyPairForm from './CurrencyPairForm.jsx';

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function Swap () {
  const { chainId } = useMoralis()
  const { 
    estimatedSide, 
    inputCurrency, 
    slippage, 
    trade, 
    executeSwap, 
    tradeIsLoading, 
    inputAmount,
    highPriceImpactIgnored
  } = useContext(AppContext);
  const { hasAllowance, updateAllowance } = useAllowances()
  const [swapButtonIsLoading, setSwapButtonIsLoading] = useState(false)
  const [inputIsLoading, setInputIsLoading] = useState(false)
  const [outputIsLoading, setOutputIsLoading] = useState(false)
  const [showApproveBtn, setShowApproveBtn] = useState(false)
  const [approvalIsLoading, setApprovalIsLoading] = useState(false)
  const [approvalText, setApprovalText] = useState('Approve')
  const [highPriceImpact, setHighPriceImpact] = useState(false)
  const [exceedsMaxPriceImpact, setExceedsMaxPriceImpact] = useState(false)

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

  const trySwap = async () => {
    setSwapButtonIsLoading(true)
    const swap = await executeSwap(trade)
    setSwapButtonIsLoading(false)
  }

  useEffect(() => {
    if (!trade) return
    trade?.swap?.priceImpact.toSignificant() > HIGH_PRICE_IMPACT
      ? setHighPriceImpact(true)
      : setHighPriceImpact(false)
    
    trade?.swap?.priceImpact.toSignificant() > MAXMIMUM_PRICE_IMPACT && !highPriceImpactIgnored
      ? setExceedsMaxPriceImpact(true)
      : setExceedsMaxPriceImpact(false)
  }, [trade, highPriceImpactIgnored])

  const swapButtonIsDisabled = () => {
    return showApproveBtn || exceedsMaxPriceImpact
  }

  const swapButtonText = () => {
    return exceedsMaxPriceImpact && !showApproveBtn ? 'Price Impact Too High' : 'Swap 🔁'
  }

  useEffect(() => {
    if (!tradeIsLoading) {
      setInputIsLoading(false)
      setOutputIsLoading(false)
      return
    }
    if (estimatedSide === 'input') return setInputIsLoading(true)
    return setOutputIsLoading(true)
  }, [tradeIsLoading, estimatedSide])

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
    <div>
      <Row>
        <Col>
          <Card style={styles.card} title={
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col span={12}>
                PawSwap
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                <Settings />
              </Col>
            </Row>
          }> 
            <CurrencyPairForm 
              type="swap" 
              inputIsLoading={inputIsLoading}
              outputIsLoading={outputIsLoading}
            />
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
                    backgroundColor: highPriceImpact && !swapButtonIsDisabled() ? COLORS.error : '',
                    ...styles.outset,
                  }}
                  onClick={() => trySwap()}
                  disabled={swapButtonIsDisabled()}
                  loading={swapButtonIsLoading}
                >
                  {swapButtonText()}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      { 
        !trade ? '' :
        <TradeCard />
      }
    </div>
  )
}

export default Swap;