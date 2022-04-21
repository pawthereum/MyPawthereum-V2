import { useEffect, useState } from 'react'
import { tokenList as defaultTokenList, tokenList } from '../constants/tokenList'

const useSwap = () => {
  const [tokenList, setTokenList] = useState([])
  const [inputCurrency, setInputCurrency] = useState(null)
  const [outputCurrency, setOutputCurrency] = useState(null)


  function updateInputCurrency (tokenAddr) {
    return setInputCurrency(tokenAddr)
  }

  function updateOutputCurrency(tokenAddr) {
    return setOutputCurrency(tokenAddr)
  }

  useEffect(() => {
    setTokenList(defaultTokenList.tokens)
  }, [defaultTokenList])
  
  return { tokenList, inputCurrency, updateInputCurrency, outputCurrency, updateOutputCurrency }
}

export default useSwap;