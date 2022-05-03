import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokenList as defaultTokenList } from '../constants/tokenList'
import { PAWSWAP_ROUTER, PANCAKESWAP_ROUTER, PAWSWAP, DEFAULT_SLIPPAGE, PAWSWAP_FACTORY, PANCAKESWAP_FACTORY } from '../constants'
import { notification } from 'antd'
import { networkConfigs } from 'helpers/networks'
import { taxStructureAbi } from 'constants/abis/taxStructure'
import useNative from './useNative'
import useDexs from './useDexs'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { Token, TokenAmount, Pair, TradeType, Trade, Route } from '@uniswap/sdk'

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

let tradeNonce = 0

const useSwapContext = () => {
  const { Moralis, chainId, web3, account } = useMoralis()
  const { isNative } = useNative()
  const { dexs } = useDexs()
  const [estimatedSide, setEstimatedSide] = useState(null)
  const [inputCurrency, setInputCurrency] = useState(null)
  const [inputAmount, setInputAmount] = useState(null)
  const [outputCurrency, setOutputCurrency] = useState(null)
  const [outputAmount, setOutputAmount] = useState(null)
  const [trade, setTrade] = useState(null)
  const [tokenList, setTokenList] = useState([])
  const [tokenTaxContract, setTokenTaxContract] = useState(null)
  const [tokenTaxStructureTaxes, setTokenTaxStructureTaxes] = useState(null)
  const [latestTaxLookup, setLatestTaxLookup] = useState(null)
  const [tokenTaxContractFeeDecimal, setTokenTaxContractFeeDecimal] = useState(null)
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE)
  const [tradeIsLoading, setTradeIsLoading] = useState(false)
  const [pair, setPair] = useState(null)
  const [pairReserves, setPairReserves] = useState(null)
  const [dex, setDex] = useState(null)

  const sortTokens = async (tokenList) => {
    return await tokenList.sort((a, b) => a.address > b.address ? 1 : -1)
  }

  const updateSlippage = (amt) => {
    setSlippage(Number(amt) / 100)
  }
  
  const updateEstimatedSide = (side) => {
    setEstimatedSide(side)
  }

  const determineSide = (inputCurrency) => {
    if (isNative(inputCurrency.address)) return 'buy'
    return inputCurrency.address.toLowerCase() === networkConfigs[chainId].wrapped?.toLowerCase() ? 'buy' : 'sell'
  }

  const updateDex = async (inputCurrency, outputCurrency) => {
    if (!inputCurrency.dex && !outputCurrency.dex) {
      setDex(dexs['pawswap'])
      return dexs['pawswap']
    }
    if (outputCurrency.dex) {
      setDex(dexs[outputCurrency.dex])
      return dexs[outputCurrency.dex]
    } 
    setDex(dexs[inputCurrency.dex])
    return dexs[inputCurrency.dex]
  }

  const updatePair = async (sortedPair, factory) => {
    const web3Provider = Moralis.web3Library;
    const pairAddress = getCreate2Address(
      web3Provider.utils.getAddress(factory.address),
      keccak256(['bytes'], [pack(['address', 'address'], [
        web3Provider.utils.getAddress(sortedPair[0]), 
        web3Provider.utils.getAddress(sortedPair[1])
      ])]),
      factory.initCodeHash
    )
    setPair(pairAddress)
    return pairAddress
  }

  const updatePairReserves = async (pairAddr) => {
    const web3Provider = Moralis.web3Library;

    const pairContract = new web3Provider.Contract(
      pairAddr,
      ["function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"],
      web3.getSigner()
    )

    try {
      const pairReserves = await pairContract.getReserves()
      setPairReserves(pairReserves)
      return pairReserves
    } catch (e) {
      console.log('error getting reserves', e)
      setTradeIsLoading(false)
      return openNotification({
        message: "⚠️ Error getting reserves!",
        description: `${e.message} ${e.data?.message}`
      });
    }
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

  const fetchQuote = async (params) => {
    const web3Provider = Moralis.web3Library

    const routerContract = new web3Provider.Contract(
      params.routerAddress,
      params.routerAbi,
      web3.getSigner()
    )

    console.log('fetching quotes...', params)
    
    if (params.estimatedSide === 'output') {
      try {
        console.log('params', params)
        const amounts = await routerContract.getAmountsOut(
          params.amount,
          [params.inputCurrency.address, params.outputCurrency.address]
        )
        console.log('amounts', amounts)
        return Moralis.Units.FromWei(amounts[1], params.outputCurrency?.decimals)
      } catch (e) {
        console.log('error getting quote', e)
        setTradeIsLoading(false)
        openNotification({
          message: "⚠️ Error Fetching Quote!",
          description: `${e.message} ${e.data?.message}`
        });
      }
    } else {
      try {
        console.log('params for estimated in', params)
        const amounts = await routerContract.getAmountsIn(
          params.amount,
          [params.inputCurrency.address, params.outputCurrency.address]
        )
        console.log('amounts but in', amounts)
        return Moralis.Units.FromWei(amounts[0], params.inputCurrency?.decimals)
      } catch (e) {
        console.log('error getting quote')
        setTradeIsLoading(false)
        openNotification({
          message: "⚠️ Error Fetching Quote!",
          description: `${e.message} ${e.data?.message}`
        });
      }
    }
  }

  const getTaxes = async (taxStructContract) => {
    let taxList = []
    try {
      taxList = await Promise.all([
        taxStructContract.burnTaxBuyAmount(account),
        taxStructContract.burnTaxSellAmount(account),
        taxStructContract.liquidityTaxBuyAmount(account),
        taxStructContract.liquidityTaxSellAmount(account),
        taxStructContract.tax1Name(),
        taxStructContract.tax1BuyAmount(account),
        taxStructContract.tax1SellAmount(account),
        taxStructContract.tax2Name(),
        taxStructContract.tax2BuyAmount(account),
        taxStructContract.tax2SellAmount(account),
        taxStructContract.tax3Name(),
        taxStructContract.tax3BuyAmount(account),
        taxStructContract.tax3SellAmount(account),
        taxStructContract.tax4Name(),
        taxStructContract.tax4BuyAmount(account),
        taxStructContract.tax4SellAmount(account),
        taxStructContract.tokenTaxName(),
        taxStructContract.tokenTaxBuyAmount(account),
        taxStructContract.tokenTaxSellAmount(account),
        taxStructContract.customTaxName(),
      ])
    } catch (e) {
      console.log('error getting tax list', e)
      setTradeIsLoading(false)
      return openNotification({
        message: "⚠️ Error getting taxes for token!",
        description: `${e.message} ${e.data?.message}`
      });
    }
    const taxes = [
      {
        name: 'Burn Tax',
        buy: taxList[0],
        sell: taxList[1],
        isBurn: true,
      },
      {
        name: 'Liquidity Tax',
        buy: taxList[2],
        sell: taxList[3],
        isLiquidity: true,
      },
      {
        name: taxList[4],
        buy: taxList[5],
        sell: taxList[6]
      },
      {
        name: taxList[7],
        buy: taxList[8],
        sell: taxList[9]
      },
      {
        name: taxList[10],
        buy: taxList[11],
        sell: taxList[12]
      },
      {
        name: taxList[13],
        buy: taxList[14],
        sell: taxList[15]
      },
      {
        name: taxList[16],
        buy: taxList[17],
        sell: taxList[18]
      },
      {
        name: taxList[19],
        buy: 0,
        sell: 0
      }
    ]
    return taxes
  }

  const fetchTaxStructure = async (tokenAddr) => {
    const web3Provider = Moralis.web3Library;

    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )

    try {
      const taxStructAddr = await pawswap.tokenTaxContracts(tokenAddr)
      if (taxStructAddr.toLowerCase() === tokenTaxContract?.address) return tokenTaxContract
      const newStruct = new web3Provider.Contract(
        taxStructAddr,
        taxStructureAbi,
        web3.getSigner()
      )
      setTokenTaxContract(newStruct)
      setLatestTaxLookup(tokenAddr)
      const taxes = await getTaxes(newStruct)
      setTokenTaxStructureTaxes(taxes)
      return { taxStructureContract: newStruct, taxes }
    } catch (e) {
      console.log('error getting token tax contract')
      setTradeIsLoading(false)
      return openNotification({
        message: "⚠️ Error getting tax structure for token!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const fetchPairReserves = async (params) => {
    const web3Provider = Moralis.web3Library;

    const factoryContract = new web3Provider.Contract(
      params.factoryAddress,
      params.factoryAbi,
      web3.getSigner()
    )

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
      console.log('error getting reserves', e)
      setTradeIsLoading(false)
      return openNotification({
        message: "⚠️ Error getting reserves!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function createTrade (params) {
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    setTradeIsLoading(true)

    const side = determineSide(inputCurrency)

    // only fetch a fresh tax structure if we have to
    const tokenRequiringTaxStructure = side === 'buy' ? outputCurrency : inputCurrency
    let taxStructureContract, taxes
    if (latestTaxLookup === tokenRequiringTaxStructure.address) {
      taxStructureContract = tokenTaxContract
      taxes = tokenTaxStructureTaxes
    } else {
      const freshTaxStruct = await fetchTaxStructure(tokenRequiringTaxStructure.address)
      taxStructureContract = freshTaxStruct.taxStructureContract
      taxes = freshTaxStruct.taxes
    }

    const totalTax = taxes.reduce((p, t) => {
      return p + Number(t[side])
    }, 0)

    const amountPreTax = estimatedSide === 'input' 
      ? BigNumber.from(outputAmount)
      : BigNumber.from(inputAmount)

    const feeDecimal = await taxStructureContract.feeDecimal()
    setTokenTaxContractFeeDecimal(feeDecimal)

    const multiplier = 10**(Number(feeDecimal) + 2)
    const taxMultiplied = multiplier - totalTax
    const amount = amountPreTax.mul(taxMultiplied).div(multiplier)
    const tokenIn = new Token(
      chainId, 
      web3Provider.utils.getAddress(inputCurrency?.address), 
      inputCurrency?.decimals
    )
    const tokenOut = new Token(
      chainId, 
      web3Provider.utils.getAddress(outputCurrency?.address), 
      outputCurrency?.decimals
    )
    const sortedTokens = await sortTokens([tokenIn, tokenOut])
    const tokenPair = new Pair(new TokenAmount(sortedTokens[1], pairReserves[1]), new TokenAmount(sortedTokens[0], pairReserves[0]))

    let route, trade
    if (estimatedSide === 'output') {
      route = new Route([tokenPair], tokenIn)
      trade = new Trade(route, new TokenAmount(tokenIn, amount), TradeType.EXACT_INPUT)
    } else {
      route = new Route([tokenPair], tokenOut)
      trade = new Trade(route, new TokenAmount(tokenIn, amount), TradeType.EXACT_OUTPUT)
    }

    // liquidity taxes aren't accounted for in quotes
    const liqTaxSearch = taxes.find(t => t.isLiquidity)
    // const liqTax = !liqTaxSearch ? 0 : Number(liqTaxSearch[side]) / 100**feeDecimal
    const liqTax = !liqTaxSearch ? 0 : Number(liqTaxSearch[side])
    
    if (liqTax > 0) {
      const liqTaxMultiplied = multiplier - liqTax
      trade.outputAmount = trade.outputAmount.multiply(liqTaxMultiplied).divide(multiplier)
    }

    console.log('amount out after tax', trade.outputAmount.toFixed(8))

    let amountOutSlippage = trade.outputAmount.toFixed(outputCurrency.decimals)
    if (slippage > 0) {
      const slippageMultiplied = multiplier - (slippage * multiplier)
      amountOutSlippage = trade.outputAmount.multiply(slippageMultiplied).divide(multiplier).toFixed(outputCurrency.decimals)
    }

    const amountIn = estimatedSide === 'input'
      ? inputAmount
      : Moralis.Units.FromWei(inputAmount, inputCurrency?.decimals)

    setTradeIsLoading(false)
    // the latest trade in is the latest trade printed on screen
    if (tradeNonce - 1 !== params.nonce) return false
    setTrade({
      tokenIn: inputCurrency,
      tokenOut: outputCurrency,
      amountIn: amountIn,
      amountOut: trade.outputAmount.toFixed(outputCurrency.decimals),
      amountOutSlippage,
      side,
      taxes,
      priceImpact: 0,
      swap: trade,
    })
  }

  async function executeSwap (trade) {
    const { tokenIn, tokenOut, amountIn, amountOutSlippage, side } = trade
    const web3Provider = Moralis.web3Library;
    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )
    let swapReq
    try {
      if (side === 'buy') {
        swapReq = await pawswap.buyOnPawSwap(
          tokenOut.address,
          '0',
          account,
          '0',
          amountOutSlippage,
          { value: Moralis.Units.Token(amountIn, 18) }
        )
      } else {
        swapReq = await pawswap.sellOnPawSwap(
          tokenIn.address,
          Moralis.Units.Token(amountIn, tokenIn.decimals),
          '0',
          account,
          '0',
          amountOutSlippage,
        )
      }
    } catch (e) {
      console.log('error doing swap', e)
      setTradeIsLoading(false)
      return openNotification({
        message: "⚠️ Error swapping!",
        description: `${e.message} ${e.data?.message}`
      });
    }

    openNotification({
      message: "🔊 Swap Submitted!",
      description: `${swapReq.hash}`,
      link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + swapReq.hash
    })

    try {
      const tx = await swapReq.wait()
      openNotification({
        message: "🎉 Swap Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      })
      return tx
    } catch (e) {
      setTradeIsLoading(false)
      openNotification({
        message: "⚠️ Swap Error!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  useEffect(() => {
    setTokenList(defaultTokenList.tokens)
  }, [defaultTokenList])

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) return
    console.log('using my effects')
    setUpForTrades()

    async function setUpForTrades() {
      console.log('getting my dex...')
      const dex = await updateDex(inputCurrency, outputCurrency)
      console.log('i am sorting... got my dex', dex)
      const sortedTokenPair = await sortTokens([inputCurrency, outputCurrency])
      console.log('sorted my token pair', sortedTokenPair)
      const pairAddress = await updatePair(
        sortedTokenPair.map(t => t.address), 
        dex.factory
      )
      console.log('got my pair address')
      updatePairReserves(pairAddress)
    }
  }, [inputCurrency, outputCurrency])

  useEffect(() => {
    if (!inputAmount && !outputAmount) return
    if (inputAmount === "0" && !outputAmount) return
    if (!inputAmount && outputAmount === "0") return
    if (!inputCurrency || !outputCurrency || !pairReserves) return

    console.log('we have a trade!', {
      inputAmount, outputAmount, inputCurrency, outputCurrency
    })
    const nonce = tradeNonce
    tradeNonce++
    createTrade({
      inputAmount,
      outputAmount,
      inputCurrency,
      outputCurrency,
      slippage,
      nonce
    })

  }, [inputAmount, outputAmount, inputCurrency, outputCurrency, slippage, pairReserves])

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
    executeSwap,
    taxes: tokenTaxStructureTaxes,
    tokenTaxContractFeeDecimal,
    slippage,
    updateSlippage,
    tradeIsLoading
  }
}

export default useSwapContext;
