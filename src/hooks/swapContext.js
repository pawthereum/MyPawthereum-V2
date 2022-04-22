import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokenList as defaultTokenList } from '../constants/tokenList'
import { PAWSWAP_FACTORY, PANCAKESWAP_FACTORY } from '../constants'
import { notification } from 'antd'

const openNotification = ({ message, description, link }) => {
  notification.open({
    message,
    description,
    onClick: () => {
      if (!link) return
      window.location.href = link
    },
    placement: 'topRight'
  });
};

const useSwapContext = () => {
  const { Moralis, chainId, web3 } = useMoralis()
  const [estimatedSide, setEstimatedSide] = useState(null)
  const [inputCurrency, setInputCurrency] = useState(null)
  const [inputAmount, setInputAmount] = useState(null)
  const [outputCurrency, setOutputCurrency] = useState(null)
  const [outputAmount, setOutputAmount] = useState(null)
  const [trade, setTrade] = useState(null)
  const [tokenList, setTokenList] = useState([])

  const updateEstimatedSide = (side) => {
    setEstimatedSide(side)
  }

  const updateInputCurrency = async (currency) => {
    await Promise.all([
      setInputAmount(null),
      setInputCurrency(currency)
    ])
  }

  const updateInputAmount = ({ amount, updateEstimated }) => {
    if (updateEstimated) {
      updateEstimatedSide('output')
    }
    if (amount === null) return setInputAmount(null)
    const decimals = inputCurrency?.decimals || '18'
    setInputAmount(Moralis.Units.Token(amount, decimals))
  }

  const updateOutputCurrency = async (currency) => {
    await setOutputCurrency(currency)
  }

  const updateOutputAmount = ({ amount, updateEstimated }) => {
    if (updateEstimated) {
      updateEstimatedSide('input')
    }
    if (amount === null) return setOutputAmount(null)
    const decimals = outputCurrency?.decimals || '18'
    setOutputAmount(Moralis.Units.Token(amount, decimals))
  }

  const fetchPairReserves = async (params) => {
    const web3Provider = Moralis.web3Library;

    const factoryContract = new web3Provider.Contract(
      params.exchangeAddress,
      params.exchangeAbi,
      web3.getSigner()
    )
    console.log('params.exchange', params)

    try {
      const pairAddress = await factoryContract.getPair(
        params.token0,
        params.token1
      )
      const pairContract = new web3Provider.Contract(
        pairAddress,
        [ "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"],
        web3.getSigner()
      )
      return await pairContract.getReserves()

    } catch (e) {
      console.log('error getting reserves')
      return openNotification({
        message: "⚠️ Error getting reserves!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function createTrade () {
    const exchangeAddress = inputCurrency.dex === 'pancakeswap' 
      ? PANCAKESWAP_FACTORY[chainId]?.address
      : PAWSWAP_FACTORY[chainId]?.address
    
    const exchangeAbi = inputCurrency === 'pancakeswap'
      ? PANCAKESWAP_FACTORY[chainId]?.abi
      : PAWSWAP_FACTORY[chainId]?.abi

    const pairReserves = await fetchPairReserves({
      token0: inputCurrency.address,
      token1: outputCurrency.address,
      exchangeAddress: exchangeAddress,
      exchangeAbi: exchangeAbi
    })

    const token0Reserves =  Number(Moralis.Units.FromWei(pairReserves[0], inputCurrency?.decimals))
    const token1Reserves = Number(Moralis.Units.FromWei(pairReserves[1], outputCurrency?.decimals))
    
    const amount = estimatedSide === 'input' 
      ? Number(Moralis.Units.FromWei(outputAmount, outputCurrency?.decimals))
      : Number(Moralis.Units.FromWei(inputAmount, inputCurrency?.decimals))

    const k = token0Reserves * token1Reserves
    let amountOut

    if (estimatedSide === 'output') {
      const newToken1Reserve = k / (token0Reserves + amount)
      amountOut = token1Reserves - newToken1Reserve
    } else {
      const newToken0Reserve = k / (token1Reserves + amount)
      amountOut = token0Reserves - newToken0Reserve
    }

    const amountIn = estimatedSide === 'input'
      ? inputAmount
      : Moralis.Units.FromWei(inputAmount, inputCurrency?.decimals)

    setTrade({
      tokenIn: inputCurrency,
      tokenOut: outputCurrency,
      amountIn,
      amountOut
    })
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
    createTrade()

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
    trade,
  }
}

export default useSwapContext;
