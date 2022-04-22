import { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import AppContext from '../AppContext'

const useSwap = () => {
  const { Moralis } = useMoralis()
  
  const {
    estimatedSide,
    inputAmount,
    outputAmount,
    inputCurrency,
    outputCurrency
  } = useContext(AppContext)

  function createTrade () {
    console.log('creating a trade',
    {
      inputAmount,
      outputAmount,
      inputCurrency,
      outputCurrency
    })
  }
  
  return { 
  }
}

export default useSwap;