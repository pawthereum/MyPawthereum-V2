import { useContext, useEffect, useState } from 'react';
import { Button, Row, Col, Card, Popover } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import AppContext from 'AppContext'
import Account from 'components/Account/Account';
import { useMoralis, useChain} from 'react-moralis'
import TradeCard from './TradeCard';
import Settings from './Settings'
import { PAWSWAP, DEFAULT_SLIPPAGE, COLORS, HIGH_PRICE_IMPACT, MAXMIMUM_PRICE_IMPACT } from '../../../constants'
import useAllowances from 'hooks/useAllowances.js';
import CurrencyPairForm from './CurrencyPairForm.jsx';
import ConfirmSwapModal from './ConfirmSwapModal';

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

const maxApprovePopOverContent = () => (
  <div style={{ maxWidth: '250px' }}>
    Approving the maximum amount is the default for most DEX's. 
    This means that you'll approve more tokens than necessary 
    but you won't need to make future approval transactions for 
    subsequent sells of this token.
  </div>
)

const txApprovePopOverContent = () => (
  <div style={{ maxWidth: '250px' }}>
    Approving the specified amount for this transaction is a more secure practice  
    compared to the maximum approval however, you will need to make more approval 
    transactions for future sells of this token.
  </div>
)

function Swap (props) {
  const { switchNetwork } = useChain();
  const { chainId, account } = useMoralis()
  const { 
    estimatedSide, 
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
  const [maxApprovalIsLoading, setMaxApprovalIsLoading] = useState(false)
  const [highPriceImpact, setHighPriceImpact] = useState(false)
  const [exceedsMaxPriceImpact, setExceedsMaxPriceImpact] = useState(false)

  const approveInputAmount = async ({ isMax }) => {
    isMax ? setMaxApprovalIsLoading(true) : setApprovalIsLoading(true)
    await updateAllowance({
      amount: trade?.isExactIn ? inputAmount : trade?.swap?.inputAmountSlippage,
      spender: PAWSWAP[chainId]?.address,
      token: trade.swap.inputAmount.token,
      isMax,
    })

     // check the allowance even if we've already checked it recently
    checkAllowance({ forceCheck: true })
    isMax ? setMaxApprovalIsLoading(false) : setApprovalIsLoading(false)
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
    if (!account) return true
    if (props.showSwitchNetwork) return true
    if (!trade) return true
    return showApproveBtn || exceedsMaxPriceImpact
  }

  const swapButtonText = () => {
    if (!account) return 'Connect Wallet'
    if (props.showSwitchNetwork) return 'Switch Network'
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

  async function checkAllowance (params) {
    const sufficientAllowance = await hasAllowance({
      amount: trade?.isExactIn ? inputAmount : trade?.swap?.inputAmountSlippage,
      token: trade?.swap?.inputAmount?.token,
      spender: PAWSWAP[chainId]?.address,
      forceCheck: params?.forceCheck,
    })
    // show approve btn if there isnt a sufficient allowance
    setShowApproveBtn(!sufficientAllowance)
  }

  useEffect(() => {
    if (!trade) return setShowApproveBtn(false)
    if (trade?.isExactIn && !inputAmount) return
    if (!trade?.isExactIn && !trade?.swap?.inputAmountSlippage) return
    // if (!trade?.swap?.inputAmountSlippage && !trade?.swap?.inputAmount?.token) return
    if (trade.side === 'buy') return
    checkAllowance()
  }, [trade])

  const SwitchNetwork = () => (
    <Button 
      onClick={() => switchNetwork(props.switchNetworkTo)} 
      type="primary" 
      style={{ borderRadius: "0.6rem" }}
    >
      Switch Network
    </Button>
  )

  return (
    <div>
      <Row>
        <Col>
          <Card style={styles.card} title={
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col span={12}>
                PawSwap
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                { props.showSwitchNetwork ? <span style={{ marginRight: '10px' }}><SwitchNetwork /></span> : '' }
                { props.showAccount ? <span style={{ marginRight: '10px' }}><Account/></span> : '' }
                <Settings />
              </Col>
            </Row>
          }> 
            <CurrencyPairForm 
              type="swap" 
              inputIsLoading={inputIsLoading}
              outputIsLoading={outputIsLoading}
            />
            <Row gutter={6} style={{
              marginTop: slippage === DEFAULT_SLIPPAGE ? '30px' : '15px'
            }}>
              {
                !showApproveBtn ? '' :
                <>
                <Col span={12}>
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      width: "100%",
                      // marginTop: "15px",
                      borderRadius: "0.6rem",
                      // height: "50px",
                      whiteSpace: "normal",
                      height:'65px',
                      marginBottom:'10px',
                      ...styles.outset,
                    }}
                    onClick={() => approveInputAmount({ isMax: true })}
                    disabled={approvalIsLoading}
                    loading={maxApprovalIsLoading}
                  >
                    <span>
                      {maxApprovalIsLoading ? 'Approving' :
                        <span>
                          Approve Maximum
                          <Popover content={maxApprovePopOverContent} trigger="hover" onClick={e => e.stopPropagation()}>
                            <QuestionCircleOutlined style={{ marginLeft: '5px' }}/>
                          </Popover>
                        </span>
                      }
                    </span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    size="large"
                    style={{
                      width: "100%",
                      // marginTop: "15px",
                      borderRadius: "0.6rem",
                      // height: "50px",
                      ...styles.outset,
                      whiteSpace: "normal",
                      height:'65px',
                      marginBottom:'10px'
                    }}
                    onClick={() => approveInputAmount({ isMax: false })}
                    disabled={maxApprovalIsLoading}
                    loading={approvalIsLoading}
                  >
                    <span>
                      {approvalIsLoading ? 'Approving' :
                        <span>
                          Approve Transaction
                          <Popover content={txApprovePopOverContent} trigger="hover" onClick={e => e.stopPropagation()}>
                            <QuestionCircleOutlined style={{ marginLeft: '5px' }}/>
                          </Popover>
                        </span>
                      }
                    </span>
                  </Button>
                </Col>
                </>
              }
              <Col span={showApproveBtn ? 0 : 24}>
                {/* <ConfirmSwapModal /> */}
                <Button
                  type="primary"
                  size="large"
                  style={{
                    width: "100%",
                    // marginTop: `${slippage === DEFAULT_SLIPPAGE ? '15px' : '0px'}`,
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