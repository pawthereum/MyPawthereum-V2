import { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import AppContext from 'AppContext'
import { useMoralis } from 'react-moralis' 
import CustomWalletPicker from './CustomWalletPicker'

function CustomTaxInputAmount (props) {
  const { 
    inputCurrency,
    outputCurrency,
    customTaxPercentage,
    updateCustomTaxPercentage
  } = useContext(AppContext);
  const { Moralis } = useMoralis()

  const [value, setValue] = useState(null)

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
      <CustomWalletPicker />
    </div>
  )
}

export default CustomTaxInputAmount;