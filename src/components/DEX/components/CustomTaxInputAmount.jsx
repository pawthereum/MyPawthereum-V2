import { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import CurrencyPicker from './CurrencyPicker'
import AppContext from 'AppContext'
import { useMoralis } from 'react-moralis' 

function CustomTaxInputAmount (props) {
  const { 
    inputCurrency,
    outputCurrency,
    customTaxPercentage,
    updateCustomTaxPercentage
  } = useContext(AppContext);
  const { Moralis } = useMoralis()

  const [value, setValue] = useState(null)
  const [precision, setPrecision] = useState(9)

  function onInputChange(amount) {
    console.log('updating to...', amount)
   updateCustomTaxPercentage(amount)
  }

  useEffect(() => {
    setValue(null)
  }, [inputCurrency, outputCurrency])

  useEffect(() => {
    if (!customTaxPercentage) return
    setValue(customTaxPercentage.toSignificant())
  }, [customTaxPercentage])

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
        min={0}
        precision={0}
        value={value}
        formatter={v => !v ? v : v + '%'}
        onChange={onInputChange}
        controls={false}
        keyboard={true}
      />
      <CurrencyPicker side={props.side} />
    </div>
  )
}

export default CustomTaxInputAmount;