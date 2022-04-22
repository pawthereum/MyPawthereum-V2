import { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import CurrencyPicker from './CurrencyPicker'
import AppContext from 'AppContext'

function CurrencyAmountInput (props) {
  const { trade, estimatedSide, updateInputAmount, updateOutputAmount, inputCurrency, outputCurrency } = useContext(AppContext);
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (!trade) return
    if (estimatedSide === props.side) {
      setValue(trade?.amountOut)
    } else {
      setValue(trade?.amountIn)
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
      setValue(0)
    } else {
      if (!outputCurrency) return
      setValue(0)
    }
  }, [inputCurrency, outputCurrency])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
      />
      <CurrencyPicker side={props.side} />
    </div>
  )
}

export default CurrencyAmountInput;