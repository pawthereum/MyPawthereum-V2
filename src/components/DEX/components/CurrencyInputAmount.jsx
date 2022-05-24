import { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import CurrencyPicker from './CurrencyPicker'
import AppContext from 'AppContext'
import { useMoralis } from 'react-moralis' 

function CurrencyAmountInput (props) {
  const { 
    trade, 
    estimatedSide, 
    updateInputAmount, 
    updateOutputAmount, 
    inputCurrency, 
    outputCurrency, 
  } = useContext(AppContext);
  const { Moralis } = useMoralis()

  const [value, setValue] = useState(null)
  const [precision, setPrecision] = useState(9)

  useEffect(() => {
    if (!trade) return
    if (props.side !== estimatedSide) return
    const amount = props.side === 'output' ? 'outputAmount' : 'inputAmount'
    setValue(trade.swap[amount].toSignificant(trade.swap[amount].token.decimals))
  }, [trade])

  function onInputChange(amount) {
    if (!props.side) return
    if (!amount) return
    // prevent decimal overflow by returning if exceeding max decimals
    const maxDecimals = props.side === 'output' 
      ? outputCurrency?.decimals
      : inputCurrency?.decimals
    const numDecimals = amount.toString().split('.')[1]?.length
    const isUnderMaxDecimals = !numDecimals || numDecimals <= maxDecimals
    if (!isUnderMaxDecimals) return

    // prevent decimal overflow by converting to weth and back to eth
    const tokenAmt = Moralis.Units.Token(amount, maxDecimals)
    const ethAmt = Moralis.Units.FromWei(tokenAmt, maxDecimals)

    setValue(ethAmt)

    props.side === 'output' 
      ? updateOutputAmount({ amount: ethAmt, updateEstimated: true })
      : updateInputAmount({ amount: ethAmt, updateEstimated: true })  
  }

  useEffect(() => {
    if (props.side === 'input') {
      if (!inputCurrency) return
      setValue(null)
      setPrecision(inputCurrency?.decimals)
    } else {
      if (!outputCurrency) return
      setValue(null)
      setPrecision(outputCurrency?.decimals)
    }
  }, [inputCurrency, outputCurrency])

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
    }}>
      <InputNumber
        style={{
          width: '100%',
          fontWeight: 900,
          fontSize: '1.25em',
        }}
        bordered={false}
        placeholder="0"
        size="large"
        defaultValue={null}
        min="0"
        precision={precision}
        formatter={v => v > 0 ? Number(v).toLocaleString([], {
          minimumFractionDigits: 0,
          maximumFractionDigits: 18
        }) : v}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        value={value}
        onChange={onInputChange}
        controls={false}
        keyboard={false}
        stringMode
      />
      <CurrencyPicker side={props.side} />
    </div>
  )
}

export default CurrencyAmountInput;