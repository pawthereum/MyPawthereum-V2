
import { useContext, useEffect, useState } from 'react';
import { Row, Col, Space, Popover } from 'antd'
import { COLORS, DEFAULT_SLIPPAGE } from '../../../constants'
import { useMoralis } from 'react-moralis'
import AppContext from 'AppContext';
import { useERC20Balance } from 'hooks/useERC20Balance';
import useNative from 'hooks/useNative';
import CurrencyAmountInput from './CurrencyInputAmount';
import CustomTaxInputAmount from './CustomTaxInputAmount';
import { QuestionCircleOutlined, PlusOutlined, ArrowDownOutlined, EllipsisOutlined } from '@ant-design/icons';

const styles = {
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  }
}

function CurrencyPairForm (props) {
  const {
    inputIsLoading,
    outputIsLoading,
    type
  } = props
  const { 
    estimatedSide, 
    inputCurrency, 
    outputCurrency, 
    updateInputCurrency, 
    updateOutputCurrency,
    trade,
    tokenTaxContractFeeDecimal,
    executeSwap, 
    slippage, 
    inputAmount,
    highPriceImpactIgnored,
    taxes
  } = useContext(AppContext);

  const { Moralis, chainId } = useMoralis()
  const { assets } = useERC20Balance()
  const { isNative, getNativeBalance } = useNative()

  const [inputColor, setInputColor] = useState(COLORS.defaultBg)
  const [outputColor, setOutputColor] = useState(COLORS.defaultBg)
  const [inputCurrencyBalance, setInputCurrencyBalance] = useState(null)
  const [outputCurrencyBalance, setOutputCurrencyBalance] = useState(null)
  const [customTaxName, setCustomTaxName] = useState(null)

  const setNativeBalance = async (side) => {
    const balance = await getNativeBalance()
    if (side === 'input') {
      return setInputCurrencyBalance(Moralis.Units.FromWei(balance, 18))
    }
    return setOutputCurrencyBalance(Moralis.Units.FromWei(balance, 18))
  }

  const swapInputs = () => {
    const newInput = outputCurrency
    const newOutput = inputCurrency
    updateInputCurrency(newInput)
    updateOutputCurrency(newOutput)
  }

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
    }
    if (outputCurrency) {
      setOutputColor(outputCurrency?.color)
    }
  }, [inputCurrency, inputAmount, outputCurrency])

  useEffect(() => {
    if (!taxes) return setCustomTaxName(null)

    const customTax = taxes.find(t => t.isCustom)
    if (customTax.name === '') return setCustomTaxName(null)
    setCustomTaxName(customTax.name)
  }, [taxes])

  const showSavingsTooltip = () => {
    if (!trade) return false
    const currencyWithSavings = trade.side === 'buy' ? outputCurrency : inputCurrency
    const typicalTaxProp = trade.side === 'buy' ? 'typicalBuyTax' : 'typicalSellTax'
    const typicalTax = currencyWithSavings[typicalTaxProp]
    if (!typicalTax) return false
    return true
  }

  const SavingsToolTip = () => {
    const customTax = taxes.find(t => t.isCustom)[trade.side] / 10**tokenTaxContractFeeDecimal
    const callToActionText = customTax > 0 
      ? 'You are amazing!' 
      : 'Would you consider donating a portion to charity?'
    const totalTax = taxes.reduce((p, t) => {
      if (!t[trade.side]) return p + 0
      return p + Number(t[trade.side])
    }, 0) / 10**tokenTaxContractFeeDecimal
    const currencyWithSavings = trade.side === 'buy' ? outputCurrency : inputCurrency
    const typicalTaxProp = trade.side === 'buy' ? 'typicalBuyTax' : 'typicalSellTax'
    const typicalTax = currencyWithSavings[typicalTaxProp]

    const savings = typicalTax - totalTax
    const popOverContent = () => (
      <div style={{ maxWidth: '250px' }}>
        Other DEX's will typically tax {typicalTax}% for trading {currencyWithSavings.symbol} but PawSwap offers incentives for projects to list with reduced fees!
      </div>
    )
    return (
      <div>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            You're saving {savings > 0 ? savings : 0}%! 
            <Popover content={popOverContent} title={"Trading fees are reduced on PawSwap!"} trigger="hover">
              <QuestionCircleOutlined style={{ marginLeft: '5px' }}/>
            </Popover>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <small>{callToActionText}</small>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row 
        style={{ 
          ...styles.inset, 
          background: `linear-gradient(to bottom, ${COLORS.defaultBg}, transparent 250%),radial-gradient(ellipse at bottom,  ${inputColor}, transparent 250%)`
        }}
        className={inputIsLoading ? 'pulse' : ''}
      >
        <Col span={24}>
          <Row style={{ marginBottom: '5px', alignItems: 'center' }}>
            <Col span={10}>
              {
                type === 'liquidity' ? '' :
                <small>From {estimatedSide === 'input' ? '(estimated)' : ''} </small>
              }
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
          {
            type === 'liquidity'
            ? <PlusOutlined />
            : <ArrowDownOutlined onClick={swapInputs} style={{ cursor: 'pointer' }} />
          }
        </Col>
      </Row>
      <Row 
        style={{ 
          ...styles.inset,
          background: `linear-gradient(to bottom, ${COLORS.defaultBg}, transparent 250%),radial-gradient(ellipse at bottom,  ${outputColor}, transparent 250%)`
        }}
        className={outputIsLoading ? 'pulse' : ''}
      >
        <Col span={24}>
          <Row style={{ marginBottom: '5px', alignItems: 'center' }}>
            <Col span={10}>
              {
                type === 'liquidity' ? '' :
                <small>To {estimatedSide === 'output' ? '(estimated)' : ''} </small>
              }
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
        type !== 'swap' || !customTaxName || !trade ? '' :
        <>
          <Row>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
              {
                showSavingsTooltip() ? <SavingsToolTip /> : <EllipsisOutlined />
              }
            </Col>
          </Row>
          <Row style={styles.inset}>
            <Col span={24}>
              <Row style={{ marginBottom: '5px', alignItems: 'center' }}>
                <Col span={10}>
                  <small>{customTaxName}</small>
                </Col>
                <Col span={14} style={{ display: 'flex', justifyContent: 'end' }}>
                  <small>Optional</small>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CustomTaxInputAmount side="output" />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      }
      {
        slippage === DEFAULT_SLIPPAGE ? '' :
        <Row style={{ fontSize: '0.80rem', display: 'flex', justifyContent: 'space-between' }}>
          <Col span={12}>Slippage Tolerance</Col>
          <Col>{slippage * 100}%</Col>
        </Row>
      }
    </Space>
  )
}

export default CurrencyPairForm;