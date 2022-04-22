import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokenList as defaultTokenList } from '../constants/tokenList'

const useSwapContext = () => {
  const { Moralis } = useMoralis()
  const [estimatedSide, setEstimatedSide] = useState(null)
  const [inputCurrency, setInputCurrency] = useState(null)
  const [inputAmount, setInputAmount] = useState(null)
  const [outputCurrency, setOutputCurrency] = useState(null)
  const [outputAmount, setOutputAmount] = useState(null)
  const [tokenList, setTokenList] = useState([])

  const updateEstimatedSide = (side) => {
    setEstimatedSide(side)
  }

  const updateInputCurrency = (currency) => {
    console.log('setting currency', currency)
    setInputCurrency(currency)
    if (!inputAmount) return
    updateInputAmount(inputAmount)
  }

  const updateInputAmount = ({ amount, updateEstimated }) => {
    if (updateEstimated) {
      updateEstimatedSide('output')
    }
    const decimals = inputCurrency?.decimals || '18'
    setInputAmount(Moralis.Units.Token(amount, decimals))
  }

  const updateOutputCurrency = (currency) => {
    setOutputCurrency(currency)
    if (!outputAmount) return
    setOutputCurrency(inputAmount)
  }

  const updateOutputAmount = ({ amount, updateEstimated }) => {
    if (updateEstimated) {
      updateEstimatedSide('input')
    }
    const decimals = outputCurrency?.decimals || '18'
    setOutputAmount(Moralis.Units.Token(amount, decimals))
  }

  useEffect(() => {
    setTokenList(defaultTokenList.tokens)
  }, [defaultTokenList])

  useEffect(() => {
    console.log('nothing yet...', {
      inputAmount, outputAmount, inputCurrency, outputCurrency
    })
    if (!inputAmount && !outputAmount) return
    if (!inputCurrency || !outputCurrency) return

    console.log('we have a trade!', {
      inputAmount, outputAmount, inputCurrency, outputCurrency
    })

  }, [inputAmount, outputAmount, inputCurrency, outputCurrency])

  return { 
    updateEstimatedSide, 
    estimatedSide,
    updateInputCurrency,
    updateInputAmount,
    updateOutputCurrency,
    updateOutputAmount,
    outputCurrency,
    outputAmount,
    inputCurrency,
    inputAmount,
    tokenList,
  }
}

export default useSwapContext;
