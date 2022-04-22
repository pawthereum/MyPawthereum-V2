import { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import CurrencyPicker from './CurrencyPicker'
import { useERC20Balance } from '../../../hooks/useERC20Balance'
import AppContext from 'AppContext'

function CurrencyAmountInput (props) {
  const { updateInputAmount, updateOutputAmount } = useContext(AppContext);

  function onInputChange(amount) {
    console.log('changed', amount);
    if (!props.side) return
    props.side === 'input' 
    ? updateInputAmount({ amount, updateEstimated: true }) 
    : updateOutputAmount({ amount, updateEstimated: true })
  }

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
        onChange={onInputChange}
        stringMode
      />
      <CurrencyPicker side={props.side} />
    </div>
  )
}

export default CurrencyAmountInput;