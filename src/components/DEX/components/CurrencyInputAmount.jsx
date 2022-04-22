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
    <InputNumber
      style={{
        width: '100%',
      }}
      bordered={false}
      placeholder="0"
      size="large"
      defaultValue={null}
      min="0"
      onChange={onInputChange}
      stringMode
      addonAfter={<CurrencyPicker side={props.side} />}
    />
  )
}

export default CurrencyAmountInput;