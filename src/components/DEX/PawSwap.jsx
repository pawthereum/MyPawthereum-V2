import { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Space, Card } from 'antd'
import { ArrowDownOutlined } from "@ant-design/icons";
import CurrencyAmountInput from './components/CurrencyInputAmount.jsx'
import AppContext from '../../AppContext'
import { useERC20Balance } from '../../hooks/useERC20Balance';
import { useMoralis } from 'react-moralis'
import TradeCard from './components/TradeCard';
import Settings from './components/Settings'
import { PAWSWAP, DEFAULT_SLIPPAGE, COLORS, HIGH_PRICE_IMPACT, MAXMIMUM_PRICE_IMPACT } from '../../constants'
import useAllowances from 'hooks/useAllowances.js';
import { networkConfigs } from 'helpers/networks.js';
import useNative from 'hooks/useNative';

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
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
function PawSwap() {
  const { Moralis, chainId } = useMoralis()
  const { assets } = useERC20Balance()
  const { 
    estimatedSide, 
    inputCurrency, 
    outputCurrency, 
    trade, 
    executeSwap, 
    slippage, 
    tradeIsLoading, 
    updateInputCurrency, 
    updateOutputCurrency,
    inputAmount,
    highPriceImpactIgnored
  } = useContext(AppContext);
  const { hasAllowance, updateAllowance } = useAllowances()
  const { isNative, getNativeBalance } = useNative()
  const [inputColor, setInputColor] = useState(COLORS.defaultBg)
  const [outputColor, setOutputColor] = useState(COLORS.defaultBg)
  const [inputCurrencyBalance, setInputCurrencyBalance] = useState(null)
  const [outputCurrencyBalance, setOutputCurrencyBalance] = useState(null)
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

  const swapInputs = () => {
    const newInput = outputCurrency
    const newOutput = inputCurrency
    updateInputCurrency(newInput)
    updateOutputCurrency(newOutput)
  }

  const setNativeBalance = async (side) => {
    const balance = await getNativeBalance()
    if (side === 'input') {
      return setInputCurrencyBalance(Moralis.Units.FromWei(balance, 18))
    }
    return setOutputCurrencyBalance(Moralis.Units.FromWei(balance, 18))
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
    if (!inputCurrency) return setInputCurrencyBalance(null)
    if (!assets) return setInputCurrencyBalance(0)
    console.log('assets', assets)
    if (isNative(inputCurrency?.address)) {
      return setNativeBalance('input')
    }
    const asset = assets.find(a => a.token_address === inputCurrency.address.toLowerCase())
    if (!asset) return setInputCurrencyBalance(0)
    setInputCurrencyBalance(Moralis.Units.FromWei(asset.balance, asset.decimals))
  }, [assets, inputCurrency])

  useEffect(() => {
    if (!outputCurrency) return setOutputCurrencyBalance(null)
    if (!assets) return setOutputCurrencyBalance(0)
    if (isNative(outputCurrency?.address)) {
      return setNativeBalance('output')
    }
    const asset = assets.find(a => a.token_address === outputCurrency.address.toLowerCase())
    if (!asset) return setOutputCurrencyBalance(0)
    setOutputCurrencyBalance(Moralis.Units.FromWei(asset.balance, asset.decimals))
  }, [assets, outputCurrency])

  useEffect(() => {
    if (inputCurrency) {
      setInputColor(inputCurrency?.color)

      if (
        inputCurrency.address !== networkConfigs[chainId]?.wrapped &&
        inputAmount && 
        Number(inputAmount) > 0
      ) {
        checkAllowance()
      }
    }
    if (outputCurrency) {
      setOutputColor(outputCurrency?.color)
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
  }, [inputCurrency, inputAmount, outputCurrency])

  return (
    <div>
      <Row>
        <Col>
          <Card style={styles.card} title={
            <Row>
              <Col span={12}>
                PawSwap
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                <Settings />
              </Col>
            </Row>
          }>            
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Row 
                style={{ 
                  ...styles.inset, 
                  background: `linear-gradient(to top, ${inputColor} -105%, ${COLORS.defaultBg})` 
                }}
                className={inputIsLoading ? 'pulse' : ''}
              >
                <Col span={24}>
                  <Row style={{ marginBottom: '5px' }}>
                    <Col span={10}>
                      <small>From {estimatedSide === 'input' ? '(estimated)' : ''} </small>
                    </Col>
                    {
                      inputCurrencyBalance !== null
                      ?
                        <Col span={14} style={{ display: 'flex', justifyContent: 'end' }}>
                          <small>Balance: {parseFloat(inputCurrencyBalance).toLocaleString([], {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 4
                          })}</small>
                        </Col>
                      : <></>
                    }
                  </Row>
                  <Row>
                    <Col span={24}>
                      <CurrencyAmountInput side="input" />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownOutlined style={{ cursor: 'pointer' }} onClick={swapInputs} />
                </Col>
              </Row>
              <Row 
                style={{ 
                  ...styles.inset, 
                  background: `linear-gradient(to top, ${outputColor} -105%, ${COLORS.defaultBg})` 
                }}
                className={outputIsLoading ? 'pulse' : ''}
              >
                <Col span={24}>
                  <Row style={{ marginBottom: '5px' }}>
                    <Col span={10}>
                      <small>To {estimatedSide === 'output' ? '(estimated)' : ''} </small>
                    </Col>
                    {
                      outputCurrencyBalance !== null
                      ?
                        <Col span={14} style={{ display: 'flex', justifyContent: 'end' }}>
                          <small>Balance: {parseFloat(outputCurrencyBalance).toLocaleString([], {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 4
                          })}</small>
                        </Col>
                      : <></>
                    }
                  </Row>
                  <Row>
                    <Col span={24}>
                      <CurrencyAmountInput side="output" />
                    </Col>
                  </Row>
                </Col>
              </Row>
              {
                slippage === DEFAULT_SLIPPAGE ? '' :
                <Row style={{ fontSize: '0.80rem', display: 'flex', justifyContent: 'space-between' }}>
                  <Col span={12}>Slippage Tolerance</Col>
                  <Col>{slippage * 100}%</Col>
                </Row>
              }
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
            </Space>
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

export default PawSwap;