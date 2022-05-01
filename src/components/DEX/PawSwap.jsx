import { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Space, Card } from 'antd'
import { ArrowDownOutlined } from "@ant-design/icons";
import CurrencyAmountInput from './components/CurrencyInputAmount.jsx'
import AppContext from '../../AppContext'
import { useERC20Balance } from '../../hooks/useERC20Balance';
import { useMoralis } from 'react-moralis'
import TradeCard from './components/TradeCard';
import Settings from './components/Settings'
import { PAWSWAP, DEFAULT_SLIPPAGE } from '../../constants'
import useAllowances from 'hooks/useAllowances.js';
import { networkConfigs } from 'helpers/networks.js';

const defaultBg = '#F0F2F5';

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
    backgroundColor: defaultBg,
    padding: '14px',
    borderRadius: '1rem'
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
    inputAmount
  } = useContext(AppContext);
  const { hasAllowance, updateAllowance } = useAllowances()
  const [inputColor, setInputColor] = useState(defaultBg)
  const [outputColor, setOutputColor] = useState(defaultBg)
  const [inputCurrencyBalance, setInputCurrencyBalance] = useState(null)
  const [outputCurrencyBalance, setOutputCurrencyBalance] = useState(null)
  const [swapButtonIsLoading, setSwapButtonIsLoading] = useState(false)
  const [inputIsLoading, setInputIsLoading] = useState(false)
  const [outputIsLoading, setOutputIsLoading] = useState(false)
  const [showApproveBtn, setShowApproveBtn] = useState(false)
  const [approvalIsLoading, setApprovalIsLoading] = useState(false)
  const [approvalText, setApprovalText] = useState('Approve')

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
    const asset = assets.find(a => a.token_address === inputCurrency.address.toLowerCase())
    if (!asset) return setInputCurrencyBalance(0)
    setInputCurrencyBalance(Moralis.Units.FromWei(asset.balance, asset.decimals))
  }, [assets, inputCurrency])

  useEffect(() => {
    if (!outputCurrency) return setOutputCurrencyBalance(null)
    if (!assets) return setOutputCurrencyBalance(0)
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
                  background: `linear-gradient(to top, ${inputColor} -105%, ${defaultBg})` 
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
                  background: `linear-gradient(to top, ${outputColor} -105%, ${defaultBg})` 
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
                    }}
                    onClick={() => trySwap()}
                    disabled={showApproveBtn}
                    loading={swapButtonIsLoading}
                  >
                    Swap 🔁
                  </Button>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
      <TradeCard></TradeCard>
    </div>
  )
}

export default PawSwap;