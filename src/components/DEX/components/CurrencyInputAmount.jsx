import { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import CurrencyPicker from './CurrencyPicker'
import AppContext from 'AppContext'

function CurrencyAmountInput (props) {
  const { 
    trade, 
    estimatedSide, 
    updateInputAmount, 
    updateOutputAmount, 
    inputCurrency, 
    outputCurrency, 
  } = useContext(AppContext);

  const [value, setValue] = useState(null)

  useEffect(() => {
    if (!trade) return
    const tradeSide = props.side === 'input' ? 'amountIn' : 'amountOut'
    console.log('our trade is', trade)
    console.log('our side is', trade[tradeSide])
    if (props.side === estimatedSide) {
      if (props.side === 'output') return setValue(trade.amountOutSlippage)
      setValue(trade[tradeSide] ? trade[tradeSide] : null)
    }
  }, [trade])

  function onInputChange(amount) {
    if (!props.side) return
    props.side === 'input' 
    ? updateInputAmount({ amount, updateEstimated: true }) 
    : updateOutputAmount({ amount, updateEstimated: true })
  }

  useEffect(() => {
    if (props.side === 'input') {
      if (!inputCurrency) return
      setValue(null)
    } else {
      if (!outputCurrency) return
      setValue(null)
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
        value={value}
        onChange={onInputChange}
        controls={false}
        keyboard={false}
        stringMode
        type="number"
      />
      <CurrencyPicker side={props.side} />
    </div>
  )
}

export default CurrencyAmountInput;