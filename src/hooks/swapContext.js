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
import { Token, TokenAmount, Pair, TradeType, Trade, Route, Percent } from '@uniswap/sdk'

const openNotification = ({ message, description, link }) => {
  notification.open({
    message,
    description,
    onClick: () => {
      if (!link) return
      window.location.href = link
    },
    placement: 'topRight',
    duration: 10,
  });
};

let tradeNonce = 0

const useSwapContext = () => {
  const { Moralis, chainId, web3, account } = useMoralis()
  const { isNative } = useNative()
  const { getDexByRouterAddress } = useDexs()
  const [estimatedSide, setEstimatedSide] = useState(null)
  const [inputCurrency, setInputCurrency] = useState(null)
  const [inputAmount, setInputAmount] = useState(null)
  const [inputToken, setInputToken] = useState(null)
  const [outputToken, setOutputToken] = useState(null)
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
  const [currentBlock, setCurrentBlock] = useState(null)
  const [highPriceImpactIgnored, setHighPriceImpactIgnored] = useState(false)

  const sortTokens = async (tokenList) => {
    return await tokenList.sort((a, b) => a.address > b.address ? 1 : -1)
  }

  useEffect(() => {
    if (!account || !chainId) return 
    const web3Provider = Moralis.web3Library.getDefaultProvider()
    web3Provider.on('block', async blockNumber => {
      if (!chainId || !account) return
      setCurrentBlock(blockNumber)
    })
  }, [account, chainId])

  const updateSlippage = (amt) => {
    setSlippage(Number(amt) / 100)
  }

  const updateIgnorePriceHighImpact = (shouldIgnore) => {
    setHighPriceImpactIgnored(shouldIgnore)
  }
  
  const updateEstimatedSide = (side) => {
    setEstimatedSide(side)
  }

  const determineSide = (inputCurrency) => {
    if (isNative(inputCurrency.address)) return 'buy'
    return inputCurrency.address.toLowerCase() === networkConfigs[chainId].wrapped?.toLowerCase() ? 'buy' : 'sell'
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
    console.log('pair contrac', pairContract)

    try {
      const pairReserves = await pairContract.getReserves()
      console.log('reserves', pairReserves)
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
    const token = new Token(chainId, currency?.address, currency?.decimals, currency?.symbol, currency?.name)
    await Promise.all([
      setInputAmount(null),
      setInputCurrency(currency),
      setInputToken(token)
    ])
  }

  const updateInputAmount = ({ amount, updateEstimated }) => {
    if (updateEstimated) {
      updateEstimatedSide('output')
    }
    if (amount === null) return setInputAmount(null)
    const tokenAmount = new TokenAmount(
      inputToken, 
      Moralis.Units.Token(amount, inputToken?.decimals)
    )
    // const decimals = inputCurrency?.decimals || '18'
    setInputAmount(tokenAmount)
  }

  const updateOutputCurrency = async (currency) => {
    const token = new Token(chainId, currency?.address, currency?.decimals, currency?.symbol, currency?.name)
    await Promise.all([
      setOutputCurrency(currency),
      setOutputToken(token)
    ])
  }

  const updateOutputAmount = ({ amount, updateEstimated }) => {
    if (updateEstimated) {
      updateEstimatedSide('input')
    }
    if (amount === null) return setOutputAmount(null)
    const tokenAmount = new TokenAmount(
      outputToken, 
      Moralis.Units.Token(amount, outputToken?.decimals)
    )

    setOutputAmount(tokenAmount)
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
    console.log({ taxStructContract })
    let taxList = []
    try {
      taxList = await Promise.all([
        taxStructContract.burnTaxBuyAmount(account),
        taxStructContract.burnTaxSellAmount(account),
        taxStructContract.liquidityTaxBuyAmount(account),
        taxStructContract.liquidityTaxSellAmount(account),
        taxStructContract.tokenTaxName(),
        taxStructContract.tokenTaxBuyAmount(account),
        taxStructContract.tokenTaxSellAmount(account),
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
        taxStructContract.customTaxName(),
        taxStructContract.feeDecimal(),
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
        preSwapSellTaxAmount: 1,
        preSwapBuyTaxAmount: 0,
        postSwapSellTaxAmount: 0,
        postSwapBuyTaxAmount: 1,
      },
      {
        name: 'Liquidity Tax',
        buy: taxList[2],
        sell: taxList[3],
        isLiquidity: true,
        preSwapSellTaxAmount: 0.5,
        preSwapBuyTaxAmount: 0.5,
        postSwapSellTaxAmount: 0.5,
        postSwapBuyTaxAmount: 0.5,
      },
      {
        name: taxList[4],
        buy: taxList[5],
        sell: taxList[6],
        preSwapSellTaxAmount: 1,
        preSwapBuyTaxAmount: 0,
        postSwapSellTaxAmount: 0,
        postSwapBuyTaxAmount: 1,
      },
      {
        name: taxList[7],
        buy: taxList[8],
        sell: taxList[9],
        preSwapSellTaxAmount: 0,
        preSwapBuyTaxAmount: 1,
        postSwapSellTaxAmount: 1,
        postSwapBuyTaxAmount: 0,
      },
      {
        name: taxList[10],
        buy: taxList[11],
        sell: taxList[12],
        preSwapSellTaxAmount: 0,
        preSwapBuyTaxAmount: 1,
        postSwapSellTaxAmount: 1,
        postSwapBuyTaxAmount: 0,
      },
      {
        name: taxList[13],
        buy: taxList[14],
        sell: taxList[15],
        preSwapSellTaxAmount: 0,
        preSwapBuyTaxAmount: 1,
        postSwapSellTaxAmount: 1,
        postSwapBuyTaxAmount: 0,
      },
      {
        name: taxList[16],
        buy: taxList[17],
        sell: taxList[18],
        preSwapSellTaxAmount: 0,
        preSwapBuyTaxAmount: 1,
        postSwapSellTaxAmount: 1,
        postSwapBuyTaxAmount: 0,
      },
      {
        name: taxList[19],
        buy: 0,
        sell: 0,
        preSwapSellTaxAmount: 0,
        preSwapBuyTaxAmount: 1,
        postSwapSellTaxAmount: 1,
        postSwapBuyTaxAmount: 0,
      }
    ]
    setTokenTaxContractFeeDecimal(taxList[20])
    return taxes
  }

  const getDex = async (taxStructureContract) => {
    const routerAddress = await taxStructureContract.routerAddress()
    const dex = getDexByRouterAddress(routerAddress)
    return dex
  }

  const getBuyAmountIn = async () => {
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )
    
    try {
      console.log('🌈🌈🌈🌈🌈🌈🌈')
      console.log(trade?.swap?.outputAmount.raw.toString())
      // console.log(BigNumber.from(trade?.swap?.outputAmount.raw).toString())
      
      const amountIn = await pawswap.getBuyAmountIn(
        account,
        outputCurrency?.address,
        '0', //TODO: this is the custom tax
        '0', //this is the extra tax 1
        trade?.swap?.outputAmount.raw.toString()
      )
      console.log('amount in', amountIn.toString())
    } catch (e) {
      console.log('e', e)
      console.log('could not estimated')
    }
  }

  const fetchTaxStructure = async (tokenAddr) => {
    console.log('feetching for', tokenAddr)
    const web3Provider = Moralis.web3Library;
    console.log('PAWSWAP[chainId]?.address', PAWSWAP[chainId]?.address)
    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )
    console.log('pawswap', pawswap)

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
      console.log({ newStruct })
      const taxStructureData = await Promise.all([
        getTaxes(newStruct),
        getDex(newStruct)
      ])
      const taxes = taxStructureData[0]
      const dex = taxStructureData[1]
      setTokenTaxStructureTaxes(taxes)
      setDex(dex)
      console.log('the dex is ~~~~~ ', dex)
      return { taxStructureContract: newStruct, taxes, dex }
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

  async function createExactInputTrade (side) {
    const feeDecimal = tokenTaxContractFeeDecimal
    
    // account for taxes that get taken before the swap happens
    const preSwapTaxProp = side === 'buy'
      ? 'preSwapBuyTaxAmount'
      : 'preSwapSellTaxAmount'
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[preSwapTaxProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100*feeDecimal)
    const preSwapTaxAmount = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(inputAmount.raw).quotient)
    let amountIn = inputAmount.subtract(preSwapTaxAmount)

    // dexes usually take a trading fee
    const tradingFeePercentage = dex?.name.toLowerCase() !== 'pawswap' 
      ? new Percent('35', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.35%
      : new Percent('20', '1000') // 0.2% trading fee on pawswap
    const tradingFeeAmount = new TokenAmount(inputToken, tradingFeePercentage.multiply(amountIn.raw).quotient)
    amountIn = amountIn.subtract(tradingFeeAmount)

    // build the trade
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]),
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    const route = new Route([tokenPair], inputToken)
    const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT)

    // account for slippage
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2
    const slippageAmount = new TokenAmount(outputToken, slippagePercentage.multiply(trade.outputAmount.raw).quotient)

    // account for taxes that get taken out after the swap
    const postSwapTaxProp = side === 'buy'
      ? 'postSwapBuyTaxAmount'
      : 'postSwapSellTaxAmount'
    const percentTakenFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[postSwapTaxProp])
    }, 0)
    const postSwapTaxPercentage = new Percent(percentTakenFromOutputPostSwap, 100**feeDecimal)
    const postSwapTaxAmount = new TokenAmount(outputToken, postSwapTaxPercentage.multiply(trade.outputAmount.raw).quotient)

    const amountOut = trade.outputAmount.subtract(postSwapTaxAmount)

    trade.outputAmountSlippage = trade.outputAmount.subtract(postSwapTaxAmount).subtract(slippageAmount)
    trade.outputAmount = amountOut
    return trade
  }

  async function createExactOutputTrade (side) {
    const feeDecimal = tokenTaxContractFeeDecimal

    // account for taxes that get taken after the swap happens.
    // we need to find the amount out to build a trade such that the % tax after the swap
    // leaves us with the amount that the user wants to receive
    // A = 100(outputdesired) / taxAmount
    const postSwapTaxProp = side === 'buy'
      ? 'postSwapBuyTaxAmount'
      : 'postSwapSellTaxAmount'
    const percentTaxesFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[postSwapTaxProp])
    }, 0)
    console.log({percentTaxesFromOutputPostSwap})
    const postSwapTaxPercentage = new Percent(percentTaxesFromOutputPostSwap, 100**feeDecimal)
    console.log({postSwapTaxPercentage: postSwapTaxPercentage.toSignificant(10)})
    console.log({ feed: 10**feeDecimal })
    const ONE_HUNDRED_PERCENT = new Percent(100, 100)
    const amountOutPercentageOfSwapResult = ONE_HUNDRED_PERCENT.subtract(postSwapTaxPercentage)

    const amountRequiredToSwap = new TokenAmount(
      outputToken,
      Moralis.Units.Token(
        outputAmount.divide(amountOutPercentageOfSwapResult).toFixed(outputCurrency.decimals),
        outputCurrency.decimals
      )
    )

    // account for slippage
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2
    const slippageAmount = new TokenAmount(outputToken, slippagePercentage.multiply(amountRequiredToSwap.raw).quotient)
    const amountRequiredToSwapWithSlippage = amountRequiredToSwap.add(slippageAmount)

    // build the trade
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]),
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    const route = new Route([tokenPair], inputToken)
    const trade = new Trade(route, amountRequiredToSwap, TradeType.EXACT_OUTPUT)
    const tradeWithSlippage = new Trade(route, amountRequiredToSwapWithSlippage, TradeType.EXACT_OUTPUT)

    // account for taxes that get taken out before the swap
    const preSwapTaxProp = side === 'buy'
      ? 'preSwapBuyTaxAmount'
      : 'preSwapSellTaxAmount'
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[preSwapTaxProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100**feeDecimal)
    const preSwapTaxAmount = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(trade.inputAmount.raw).quotient)
    let amountIn = trade.inputAmount.add(preSwapTaxAmount)

    // dexes usually take a trading fee
    const tradingFeePercentage = dex?.name.toLowerCase() !== 'pawswap' 
      ? new Percent('35', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.35%
      : new Percent('20', '1000') // 0.2% trading fee on pawswap
    const tradingFeeAmount = new TokenAmount(inputToken, tradingFeePercentage.multiply(amountIn.raw).quotient)
    amountIn = amountIn.add(tradingFeeAmount)

    const preSwapWithSlippageTaxAmount = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(tradeWithSlippage.inputAmount.raw).quotient)
    trade.inputAmountSlippage = trade.inputAmount.add(preSwapWithSlippageTaxAmount)
    const tradingFeeAmountForSlippageTrade = new TokenAmount(inputToken, tradingFeePercentage.multiply(trade.inputAmountSlippage.raw).quotient)
    trade.inputAmountSlippage = trade.inputAmountSlippage.add(tradingFeeAmountForSlippageTrade)

    console.log({
      amountIn: amountIn.toSignificant(inputToken.decimals),
      amountInSlip: trade.inputAmountSlippage.toSignificant(inputToken.decimals)
    })

    trade.inputAmount = amountIn
    return trade
  }


  async function createTrade2 (params) {
    if (estimatedSide === 'output' && !inputAmount) return
    if (estimatedSide === 'input' && !outputAmount) return
    setTradeIsLoading(true)
    const side = determineSide(inputCurrency)
    const trade = estimatedSide === 'output' 
      ? await createExactInputTrade(side)
      : await createExactOutputTrade(side)
    // const trade = estimatedSide === 'output' ? await createExactInputTrade() : await createExactOutputTrade()
    setTrade({
      inputAmount,
      outputAmount,
      swap: trade,
      side,
      estimatedSide,
      taxes: tokenTaxStructureTaxes,
      isExactIn: estimatedSide === 'output'
    })
    setTradeIsLoading(false)
  }

  async function createTrade (params) {
    setTradeIsLoading(true)
    console.log({
      inputToken,
      outputToken
    })

    // is this a sell or a buy
    const side = determineSide(inputCurrency)

    // used to calculate taxes
    const feeDecimal = tokenTaxContractFeeDecimal
    const totalTax = tokenTaxStructureTaxes.reduce((p, t) => {
      return p + Number(t[side])
    }, 0)

    // dexes usually take a trading fee
    const tradingFee = dex?.name.toLowerCase() !== 'pawswap' 
    ? new Percent('30', '10000') // 0.28% -- most other dexs have  0.3% - .25% and pawswap will always take 0.03%
    : new Percent('20', '10000') // 0.2% trading fee on pawswap

    // calculate the amount that will get taken out before swapping
    const preSwapTaxAmountProp = side === 'buy' 
      ? 'preSwapBuyTaxAmount'
      : 'preSwapSellTaxAmount' 
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t) => {
      return p + Number(t[side] * t[preSwapTaxAmountProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap / 10**feeDecimal, 100)

    // calculate the amount that will get taken out after swapping
    const postSwapTaxAmountProp = side === 'buy'
      ? 'postSwapBuyTaxAmount'
      : 'postSwapSellTaxAmount'
    const percentTakenFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t) => {
      return p + Number(t[side] * t[postSwapTaxAmountProp])
    }, 0)
    const postSwapTaxPercentage = new Percent(percentTakenFromOutputPostSwap / 10**feeDecimal, 100).add(tradingFee)

    const taxPercentage = new Percent(totalTax / 10**feeDecimal, 100).add(tradingFee)
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2

    // token pair
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]), 
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    console.log({ tokenPair })

    // calculated amount (opposite of user input)
    const amountPreTax = estimatedSide === 'output'
      ? inputAmount
      : outputAmount
    
    // the amount of taxes to adjust in the trade
    // const taxAmount = estimatedSide === 'output'
    //   ? new TokenAmount(inputToken, taxPercentage.multiply(amountPreTax.raw).quotient)
    //   : new TokenAmount(outputToken, taxPercentage.multiply(amountPreTax.raw).quotient)
    const taxAmount = estimatedSide === 'output'
      ? new TokenAmount(inputToken, preSwapTaxPercentage.multiply(amountPreTax.raw).quotient)
      : new TokenAmount(outputToken, postSwapTaxPercentage.multiply(amountPreTax.raw).quotient)
      
    console.log('taxAmount', taxAmount.toSignificant(6))

    // the amount after tax adjustments
    const amountPostTax = estimatedSide === 'output'
      ? amountPreTax.subtract(taxAmount)
      : amountPreTax.add(taxAmount)
    
    console.log(amountPostTax)
    console.log('amt post tax', amountPostTax.toSignificant(6))
    // trade route
    const route = new Route([tokenPair], inputToken)

    console.log({ route, amountPostTax })
    console.log(route.pairs[0].tokenAmounts[0].toSignificant(6))
    console.log(route.pairs[0].tokenAmounts[1].toSignificant(6))
    console.log({ params })

    let trade
    try {
      trade = estimatedSide === 'output'
      ? new Trade(route, amountPostTax, TradeType.EXACT_INPUT)
      : new Trade(route, amountPostTax, TradeType.EXACT_OUTPUT)
    } catch (e) {
      console.log('error creating trade', e)
      setTradeIsLoading(false)
      return openNotification({
        message: "⚠️ Error estimating trade!",
        description: `${e.message} ${e.data?.message}`
      });
    }

    console.log({ trade })
    console.log(' put in ' + trade.inputAmount.toSignificant(6) + ' BNB')
    console.log(' get ' + trade.outputAmount.toSignificant(6) + ' PAWTH')

    // slippage amount
    const slippageAmount = estimatedSide === 'output'
      ? new TokenAmount(outputToken, slippagePercentage.multiply(trade.outputAmount.raw).quotient)
      : new TokenAmount(inputToken, slippagePercentage.multiply(trade.inputAmount.raw).quotient)

    console.log({ slippageAmount: slippageAmount.toSignificant(6) })

    // the amount to send to the trade to account for slippage
    trade.amountSlippage = estimatedSide === 'output'
      ? trade.outputAmount.subtract(slippageAmount)
      : trade.inputAmount.add(slippageAmount)
    
    console.log({ tradeSlip: trade.amountSlippage.toSignificant(6) })

    // minimum amount in before reverting
    // const amountInMin = estimatedSide === 'output'
    //   ? new TokenAmount(tokenIn, amountPreTax)
    //   : new TokenAmount(tokenIn, amountPostTax)
    
    // // minimum amount out before reverting
    // const amountOutMin = estimatedSide === 'output'
    //   ? new TokenAmount(tokenOut, amountPostTax)
    //   : new TokenAmount(tokenOut, amountPreTax)

    console.log({
      swap: trade,
      side,
      estimatedSide,
      taxes: tokenTaxStructureTaxes,
    })
  
    setTradeIsLoading(false)
    // the latest trade in is the latest trade printed on screen
    if (tradeNonce - 1 !== params.nonce) return false
    setTrade({
      inputAmount,
      outputAmount,
      swap: trade,
      side,
      estimatedSide,
      taxes: tokenTaxStructureTaxes,
    })
    //   tokenIn: inputCurrency,
    //   tokenOut: outputCurrency,
    //   amountIn: amountIn,
    //   amountOut: amountOut,
    //   amountOutSlippage,
    //   side,
    //   taxes: tokenTaxStructureTaxes,
    //   priceImpact: 0,
    //   swap: trade,
    //   estimatedSide
    // })
  
    // // if buy, amount in is reduced by tax percentage
    // // if sell, amount out is reduced by tax percentage later
    // const multiplier = 10**(Number(feeDecimal) + 2)
    // const taxMultiplied = estimatedSide === 'output' ? multiplier - totalTax : totalTax
    // const amount = estimatedSide === 'output' 
    //   ? amountPreTax.mul(taxMultiplied).div(multiplier)
    //   : amountPreTax.mul(taxMultiplied).div(multiplier).add(amountPreTax)

    // // liquidity taxes aren't accounted for in quotes
    // const liqTaxSearch = tokenTaxStructureTaxes.find(t => t.isLiquidity)
    // // const liqTax = !liqTaxSearch ? 0 : Number(liqTaxSearch[side]) / 100**feeDecimal
    // const liqTax = !liqTaxSearch ? 0 : Number(liqTaxSearch[side])
    
    // if (liqTax > 0) {
    //   const liqTaxMultiplied = estimatedSide === 'output' ? multiplier - liqTax : liqTax
    //   if (estimatedSide === 'output') {
    //     trade.outputAmount = trade.outputAmount.multiply(liqTaxMultiplied).divide(multiplier)
    //   } else {
    //     trade.inputAmount = trade.inputAmount.multiply(liqTaxMultiplied).divide(multiplier).add(trade.inputAmount)
    //   }
    // }

    // let amountOutSlippage = trade.outputAmount
    // if (slippage > 0) {
    //   const slippageMultiplied = multiplier - (slippage * multiplier)
    //   amountOutSlippage = amountOutSlippage.multiply(slippageMultiplied).divide(multiplier)//.toFixed(outputCurrency.decimals)
    // }
    // // if (side === 'sell' && estimatedSide === 'output') {
    // //   amountOutSlippage = amountOutSlippage.multiply(taxMultiplied).divide(multiplier)
    // //   console.log({ totalTax, amountOutSlippage })
    // // }
    // amountOutSlippage = amountOutSlippage.toFixed(outputCurrency?.decimals)

    // const amountIn = estimatedSide === 'output'
    //   ? inputAmount
    //   : trade?.inputAmount.toFixed(inputCurrency.decimals)
    
    // const amountOut = estimatedSide === 'output'
    //   ? trade?.outputAmount.toFixed(outputCurrency.decimals)
    //   : outputAmount

    // setTradeIsLoading(false)
    // // the latest trade in is the latest trade printed on screen
    // if (tradeNonce - 1 !== params.nonce) return false
    // setTrade({
    //   tokenIn: inputCurrency,
    //   tokenOut: outputCurrency,
    //   amountIn: amountIn,
    //   amountOut: amountOut,
    //   amountOutSlippage,
    //   side,
    //   taxes: tokenTaxStructureTaxes,
    //   priceImpact: 0,
    //   swap: trade,
    //   estimatedSide
    // })
  }

  async function executeSwap (trade) {
    console.log(" TRADE ---<<<<----", trade)
    const { isExactIn, inputAmount, outputAmount, side, estimatedSide, swap } = trade
    const web3Provider = Moralis.web3Library;
    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )
    let swapReq
    // console.log({
    //   estimatedSide,
    //   exactOut: swap.outputAmount.raw.toString(),
    //   valueSent: swap.amountSlippage.raw.toString(),
    //   rawOut: swap.outputAmount.raw.toString(), 
    //   rawInSlip: swap.amountSlippage.raw.toString(), 
    //   rawIn: swap.inputAmount.raw.toString(),
    //   output: swap.outputAmount.raw.toString(),
    // })
    // console.log({
    //   token: swap.outputAmount.token.address,
    //   customAmt: '0',
    //   customAddr: account,
    //   extraTax1: '0',
    //   amountMin: swap.outputAmountSlippage.raw.toString(),
    //   // estimatedSide === 'output'
    //   //   ? swap.amountSlippage.raw.toString()
    //   //   : outputAmount.raw.toString(), //Moralis.Units.Token(amountOutSlippage, tokenOut.decimals)
    //   isExact: isExactIn,
    //   spent: inputAmount.raw.toString()
    // })
    console.log({
      token: swap.outputAmount.token.address,
      custom: '0',
      customAddr: account,
      extra: '0',
      amountToBuy: isExactIn 
      ? swap.outputAmount.raw.toString()
      : outputAmount.raw.toString(),
      // estimatedSide === 'output'
      //   ? swap.amountSlippage.raw.toString()
      //   : outputAmount.raw.toString(), //Moralis.Units.Token(amountOutSlippage, tokenOut.decimals)
      isExact: isExactIn,
      spend: isExactIn
      ? inputAmount.raw.toString()
      : swap.inputAmountSlippage.raw.toString()
    })
    try {
      if (side === 'buy') {
        swapReq = await pawswap.buyOnPawSwap(
          swap.outputAmount.token.address,
          '0',
          account,
          '0',
          isExactIn 
          ? swap.outputAmount.raw.toString()
          : outputAmount.raw.toString(),
          // estimatedSide === 'output'
          //   ? swap.amountSlippage.raw.toString()
          //   : outputAmount.raw.toString(), //Moralis.Units.Token(amountOutSlippage, tokenOut.decimals)
          isExactIn,
          {
            value: isExactIn
              ? inputAmount.raw.toString()
              : swap.inputAmountSlippage.raw.toString()
            // value: inputAmount.raw.toString()
          }
        )
      } else {
        swapReq = await pawswap.sellOnPawSwap(
          swap.inputAmount.token.address,
          estimatedSide === 'output'
            ? swap.inputAmount.raw.toString() //Moralis.Units.Token(amountIn, tokenIn?.decimals)
            : swap.inputAmountSlippage.raw.toString(),
          '0',
          account,
          '0',
          isExactIn
            ? swap.outputAmountSlippage.raw.toString()
            : swap.outputAmount.raw.toString(),//Moralis.Units.Token(amountOutSlippage, tokenOut.decimals),
          isExactIn
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
    setTokenList(defaultTokenList.tokens.filter(t => t.chainId == parseInt(chainId, 16)))
  }, [chainId])

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) return
    setUpForTrades()

    async function setUpForTrades() {
      setTrade(null)
      if (!account) return
      if (inputCurrency?.address.toLowerCase() === outputCurrency?.address.toLowerCase()) return
      // only fetch a fresh tax structure if we have to
      const side = determineSide(inputCurrency)
      const tokenRequiringTaxStructure = side === 'buy' ? outputCurrency : inputCurrency
      
      let dexForTrade = dex
      if (latestTaxLookup !== tokenRequiringTaxStructure.address) {
        const { dex: updatedDex } = await fetchTaxStructure(tokenRequiringTaxStructure.address)
        console.log('dex', dex)
        dexForTrade = updatedDex
      }
      // fetch details about the pair to estimate trades
      // const dex = await updateDex(inputCurrency, outputCurrency)
      const sortedTokenPair = await sortTokens([inputCurrency, outputCurrency])
      const pairAddress = await updatePair(
        sortedTokenPair.map(t => t.address), 
        dexForTrade.factory
      )
      console.log({ pairAddress })
      updatePairReserves(pairAddress)
    }
  }, [inputCurrency, outputCurrency, account])

  useEffect(() => {
    console.log('🌈🌈🌈🌈🌈🌈🌈')
    console.log({
      inputAmount,
      outputAmount
    })
    if (!inputAmount && !outputAmount) return
    if (inputAmount?.toSignificant(inputCurrency.decimals) === '0' && !outputAmount) return
    if (!inputAmount && outputAmount?.toSignificant(outputCurrency?.decimals) === '0') return
    if (!inputCurrency || !outputCurrency || !pairReserves) return
    if (!tokenTaxContract || !tokenTaxStructureTaxes || !tokenTaxContractFeeDecimal) return
    const side = determineSide(inputCurrency)
    const tokenRequiringTaxStructure = side === 'buy' ? outputCurrency : inputCurrency
    if (tokenRequiringTaxStructure.address !== latestTaxLookup) return setTradeIsLoading(true)

    console.log('we have a trade!', {
      inputAmount, outputAmount, inputCurrency, outputCurrency
    })
    const nonce = tradeNonce
    tradeNonce++
    createTrade2({
      inputAmount,
      outputAmount,
      inputCurrency,
      outputCurrency,
      slippage,
      nonce
    })

  }, [inputAmount, outputAmount, inputCurrency, outputCurrency, slippage, pairReserves, tokenTaxStructureTaxes, tokenTaxContract, tokenTaxContractFeeDecimal])

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
    highPriceImpactIgnored,
    updateIgnorePriceHighImpact,
    tradeIsLoading,
    getBuyAmountIn
  }
}

export default useSwapContext;
