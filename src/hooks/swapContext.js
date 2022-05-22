import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokenList as defaultTokenList } from '../constants/tokenList'
import { ERC20ABI, PAWSWAP_ROUTER, PANCAKESWAP_ROUTER, PAWSWAP, DEFAULT_SLIPPAGE, PAWSWAP_FACTORY, PANCAKESWAP_FACTORY } from '../constants'
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
  const [customTaxPercentage, setCustomTaxPercentage] = useState(null)
  const [customTaxWallet, setCustomTaxWallet] = useState(null)
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
    const web3Provider = Moralis.web3Library
    const BigNumber = web3Provider.BigNumber

    return await tokenList.sort((a, b) => 
      BigNumber.from(web3Provider.utils.getAddress(a.address)).lt( 
      BigNumber.from(web3Provider.utils.getAddress(b.address))) ? -1 : 1)
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

  const updateCustomTaxWallet = wallet => {
    setCustomTaxWallet(wallet)
  }

  const updateCustomTaxPercentage = amount => {
    if (!amount) amount = 0
    const updatedCustomTaxPercentage = new Percent(amount * 10**tokenTaxContractFeeDecimal, 100*10**tokenTaxContractFeeDecimal)
    const replacementCustomTax = amount * 10**tokenTaxContractFeeDecimal
    const updatedTokenTaxStructure = tokenTaxStructureTaxes.map(t => {
      if (t.isCustom) {
        t.buy = replacementCustomTax
        t.sell = replacementCustomTax
      }
      return t
    })
    setTokenTaxStructureTaxes(updatedTokenTaxStructure)

    setCustomTaxPercentage(updatedCustomTaxPercentage)
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
        isCustom: true,
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

  async function createSellExactIn (params) {
    const { inputAmount, slippage } = params

    const side = determineSide(inputCurrency)
    const feeDecimal = tokenTaxContractFeeDecimal

    /* 
     * determine the amount that gets swapped (the input amount - amount taxed preswap)
    */
    const preSwapTaxProp = 'preSwapSellTaxAmount'
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[preSwapTaxProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100**feeDecimal)
    // taxes that get taken before the swap occurs
    const taxAmountTakenFromInputPreSwap = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(inputAmount.raw).quotient)
    let amountIn = inputAmount.subtract(taxAmountTakenFromInputPreSwap)
    // dex trading fees for pawswap come out as LP token tax which can be treated like slippage
    if (dex?.name.toLowerCase() === 'pawswap') {
      const tradingFeePercentage = new Percent('20', '1000') // 0.2% trading fee on pawswap
      const tradingFeeAmountTakenFromInputPreSwap = new TokenAmount(inputToken, tradingFeePercentage.multiply(inputAmount.raw).quotient)
      amountIn = amountIn.subtract(tradingFeeAmountTakenFromInputPreSwap)
    }

    /* 
     * build the trade
    */
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]),
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    const route = new Route([tokenPair], inputToken)
    const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT)

    /* 
     * account for taxes that get taken out in tokens after the swap
    */
    const postSwapTaxProp = 'postSwapSellTaxAmount'
    const percentTakenFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[postSwapTaxProp])
    }, 0)
    const postSwapTaxPercentage = new Percent(percentTakenFromOutputPostSwap, 100**feeDecimal)
    const postSwapTaxAmount = new TokenAmount(outputToken, postSwapTaxPercentage.multiply(trade.outputAmount.raw).quotient)
    
    let amountOut = trade.outputAmount.subtract(postSwapTaxAmount)
    
    // dex trading fees for non-pawswap dexes come out postswap in eth
    if (dex?.name.toLowerCase() !== 'pawswap') {
      const tradingFeePercentage = new Percent('33', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.33%
      const tradingFeeAmountTakenFromInputPreSwap = new TokenAmount(outputToken, tradingFeePercentage.multiply(amountOut.raw).quotient)
      amountOut = amountOut.subtract(tradingFeeAmountTakenFromInputPreSwap)
    }

    // increasing slippage will allow us to receive less tokens
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2
    const slippageAmount = new TokenAmount(outputToken, slippagePercentage.multiply(trade.outputAmount.raw).quotient)

    const amountOutSlippage = amountOut.subtract(slippageAmount)

    // return the trade with an option for slippage included
    trade.outputAmountSlippage = amountOutSlippage // will send this as part of the tx (min to receive before reverting)
    trade.outputAmount = amountOut // will show this in the UI
    return trade
  }

  async function createBuyExactIn (params) {
    const { inputAmount, slippage } = params
  
    const side = determineSide(inputCurrency)
    const feeDecimal = tokenTaxContractFeeDecimal
    
    /* 
     * determine the amount that gets swapped (the input amount - amount taxed preswap)
    */
    const preSwapTaxProp = 'preSwapBuyTaxAmount'
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[preSwapTaxProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100**feeDecimal)
    // taxes that get taken before the swap occurs
    const taxAmountTakenFromInputPreSwap = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(inputAmount.raw).quotient)
    let amountIn = inputAmount.subtract(taxAmountTakenFromInputPreSwap)
    // dex trading fees for non-pawswap dexes come out preswap in eth
    if (dex?.name.toLowerCase() !== 'pawswap') {
      const tradingFeePercentage = new Percent('33', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.33%
      const tradingFeeAmountTakenFromInputPreSwap = new TokenAmount(inputToken, tradingFeePercentage.multiply(amountIn.raw).quotient)
      amountIn = amountIn.subtract(tradingFeeAmountTakenFromInputPreSwap)
    }

    /* 
     * build the trade
    */
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]),
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    const route = new Route([tokenPair], inputToken)
    const trade = new Trade(route, amountIn, TradeType.EXACT_INPUT)

    /* 
     * account for taxes that get taken out in tokens after the swap
    */
    const postSwapTaxProp = side === 'buy'
      ? 'postSwapBuyTaxAmount'
      : 'postSwapSellTaxAmount'
    const percentTakenFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[postSwapTaxProp])
    }, 0)
    const postSwapTaxPercentage = new Percent(percentTakenFromOutputPostSwap, 100**feeDecimal)
    const postSwapTaxAmount = new TokenAmount(outputToken, postSwapTaxPercentage.multiply(trade.outputAmount.raw).quotient)
    
    let amountOut = trade.outputAmount.subtract(postSwapTaxAmount)

    // dex trading fees for pawswap come out as LP token tax which can be treated like slippage
    if (dex?.name.toLowerCase() === 'pawswap') {
      const tradingFeePercentage = new Percent('20', '1000') // 0.2% trading fee on pawswap
      const tradingFeeAmountTakenFromInputPostSwap = new TokenAmount(outputToken, tradingFeePercentage.multiply(trade.outputAmount.raw).quotient)
      amountOut = amountOut.subtract(tradingFeeAmountTakenFromInputPostSwap)
    }
    // increasing slippage will allow us to receive less tokens
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2
    const slippageAmount = new TokenAmount(outputToken, slippagePercentage.multiply(trade.outputAmount.raw).quotient)

    const amountOutSlippage = amountOut.subtract(slippageAmount)

    // return the trade with an option for slippage included
    trade.outputAmountSlippage = amountOutSlippage // will send this as part of the tx (min to receive before reverting)
    trade.outputAmount = amountOut // will show this in the UI
    return trade
  }

  async function createSellExactOut (params) {
    const { outputAmount, slippage } = params

    const side = determineSide(inputCurrency)
    const feeDecimal = tokenTaxContractFeeDecimal
    const ONE_HUNDRED_PERCENT = new Percent(100, 100)

    // account for taxes that get taken after the swap happens.
    // we need to find the amount out to build a trade such that the % tax after the swap
    // leaves us with the amount that the user wants to receive
    // A = 100(outputdesired) / taxAmount
    const postSwapTaxProp = 'postSwapSellTaxAmount'
    const percentTaxesFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[postSwapTaxProp])
    }, 0)
    const postSwapTaxPercentage = new Percent(percentTaxesFromOutputPostSwap, 100**feeDecimal)
    const amountOutPercentageOfSwapResult = ONE_HUNDRED_PERCENT.subtract(postSwapTaxPercentage)
    let amountOut = new TokenAmount(
      outputToken,
      Moralis.Units.Token(
        outputAmount.divide(amountOutPercentageOfSwapResult).toFixed(outputCurrency.decimals),
        outputCurrency.decimals
      )
    )

    // dex trading fees for non-pawswap dexes come out postswap in eth
    if (dex?.name.toLowerCase() !== 'pawswap') {
      const tradingFeePercentage = new Percent('33', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.33%
      const amountOutPercentageOfTradingFee = ONE_HUNDRED_PERCENT.subtract(tradingFeePercentage)
      amountOut = new TokenAmount(
        outputToken,
        Moralis.Units.Token(
          amountIn.divide(amountOutPercentageOfTradingFee).toFixed(outputCurrency.decimals),
          outputCurrency.decimals
        )
      )
    }

    // build the trade
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]),
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    const route = new Route([tokenPair], inputToken)
    const trade = new Trade(route, amountOut, TradeType.EXACT_OUTPUT)

    // account for slippage
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2
    const slippageAmount = new TokenAmount(inputToken, slippagePercentage.multiply(trade.inputAmount.raw).quotient)
    let amountInSlippage = trade.inputAmount.add(slippageAmount)

    // account for taxes that get taken out after the swap in tokens
    const preSwapTaxProp = 'preSwapSellTaxAmount'
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[preSwapTaxProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100**feeDecimal)
    const amountInPercentageOfSwapResult = ONE_HUNDRED_PERCENT.subtract(preSwapTaxPercentage)
    let amountIn = new TokenAmount(
      inputToken,
      Moralis.Units.Token(
        trade.inputAmount.divide(amountInPercentageOfSwapResult).toFixed(inputCurrency.decimals),
        inputCurrency.decimals
      )
    )
    amountInSlippage = new TokenAmount(
      inputToken,
      Moralis.Units.Token(
        amountInSlippage.divide(amountInPercentageOfSwapResult).toFixed(inputCurrency.decimals),
        inputCurrency.decimals
      )
    )

    // dex trading fees for pawswap come out as LP token tax which can be treated like slippage
    if (dex?.name.toLowerCase() === 'pawswap') {
      const tradingFeePercentage = new Percent('20', '1000') // 0.2% trading fee on pawswap
      const tradingFeeAmountTakenFromInputPreSwap = new TokenAmount(
        inputToken, 
        tradingFeePercentage.multiply(amountIn.raw).quotient
      )
      amountIn = amountIn.add(tradingFeeAmountTakenFromInputPreSwap)

      const tradingFeeAmountTakenFromInputWithSlippagePreSwap = new TokenAmount(
        inputToken, 
        tradingFeePercentage.multiply(amountIn.raw).quotient
      )
      amountInSlippage = amountInSlippage.add(tradingFeeAmountTakenFromInputWithSlippagePreSwap)
    }

    trade.inputAmountSlippage = amountInSlippage // will send this as part of the tx (min to receive before reverting)
    trade.inputAmount = amountIn // will show this in the UI
    return trade
  }

  async function createBuyExactOut (params) {
    const { outputAmount, slippage } = params

    const side = determineSide(inputCurrency)
    const feeDecimal = tokenTaxContractFeeDecimal
    const ONE_HUNDRED_PERCENT = new Percent(100, 100)

    // account for taxes that get taken after the swap happens.
    // we need to find the amount out to build a trade such that the % tax after the swap
    // leaves us with the amount that the user wants to receive
    // A = 100(outputdesired) / taxAmount
    const postSwapTaxProp = 'postSwapBuyTaxAmount'
    const percentTaxesFromOutputPostSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[postSwapTaxProp])
    }, 0)
    const postSwapTaxPercentage = new Percent(percentTaxesFromOutputPostSwap, 100**feeDecimal)
    const amountOutPercentageOfSwapResult = ONE_HUNDRED_PERCENT.subtract(postSwapTaxPercentage)
    let amountOut = new TokenAmount(
      outputToken,
      Moralis.Units.Token(
        outputAmount.divide(amountOutPercentageOfSwapResult).toFixed(outputCurrency.decimals),
        outputCurrency.decimals
      )
    )

    // dex trading fees for pawswap come out as LP token tax which can be treated like slippage
    if (dex?.name.toLowerCase() === 'pawswap') {
      const tradingFeePercentage = new Percent('20', '1000') // 0.2% trading fee on pawswap
      const tradingFeeAmountTakenFromInputPostSwap = new TokenAmount(outputToken, tradingFeePercentage.multiply(amountOut.raw).quotient)
      amountOut = amountOut.add(tradingFeeAmountTakenFromInputPostSwap)
    }
    
    // account for slippage
    const slippagePercentage = new Percent(slippage * 100, 100) // slippage set to 0.02 becomes 2
    const slippageAmount = new TokenAmount(outputToken, slippagePercentage.multiply(amountOut.raw).quotient)
    const amountOutSlippage = amountOut.add(slippageAmount)

    console.log({
      hello: '~~~~~~~~~~~~~~~~~~',
      amountOut: amountOut.toSignificant(18),
      amountOutSlippage: amountOutSlippage.toSignificant(18)
    })

    // build the trade
    const sortedTokens = await sortTokens([inputToken, outputToken])
    const tokenPair = new Pair(
      new TokenAmount(sortedTokens[0], pairReserves[0]),
      new TokenAmount(sortedTokens[1], pairReserves[1])
    )
    const route = new Route([tokenPair], inputToken)
    const tradeWithSlippage = new Trade(route, amountOutSlippage, TradeType.EXACT_OUTPUT)
    const trade = new Trade(route, amountOut, TradeType.EXACT_OUTPUT)

    // account for taxes that get taken out before the swap
    const preSwapTaxProp = 'preSwapBuyTaxAmount'
    const percentTakenFromInputPreSwap = tokenTaxStructureTaxes.reduce((p, t)=> {
      return p + Number(t[side] * t[preSwapTaxProp])
    }, 0)
    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100**feeDecimal)
    const amountInPercentageOfSwapResult = ONE_HUNDRED_PERCENT.subtract(preSwapTaxPercentage)
    let amountIn = new TokenAmount(
      inputToken,
      Moralis.Units.Token(
        trade.inputAmount.divide(amountInPercentageOfSwapResult).toFixed(inputCurrency.decimals),
        inputCurrency.decimals
      )
    )
    let amountInSlippage = new TokenAmount(
      inputToken,
      Moralis.Units.Token(
        tradeWithSlippage.inputAmount.divide(amountInPercentageOfSwapResult).toFixed(inputCurrency.decimals),
        inputCurrency.decimals
      )
    )

    // dex trading fees for non-pawswap dexes come out postswap in eth
    if (dex?.name.toLowerCase() !== 'pawswap') {
      const tradingFeePercentage = new Percent('33', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.33%
      const amountInPercentageOfTradingFee = ONE_HUNDRED_PERCENT.subtract(tradingFeePercentage)
      amountIn = new TokenAmount(
        inputToken,
        Moralis.Units.Token(
          amountIn.divide(amountInPercentageOfTradingFee).toFixed(inputCurrency.decimals),
          inputCurrency.decimals
        )
      )
      amountInSlippage = new TokenAmount(
        inputToken,
        Moralis.Units.Token(
          amountInSlippage.divide(amountInPercentageOfTradingFee).toFixed(inputCurrency.decimals),
          inputCurrency.decimals
        )
      )
    }

    trade.inputAmountSlippage = amountInSlippage // will send this as part of the tx (min to receive before reverting)
    trade.inputAmount = amountIn // will show this in the UI
    return trade
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
    console.log({
      preSwapTaxProp,
      percentTakenFromInputPreSwap
    })

    const preSwapTaxPercentage = new Percent(percentTakenFromInputPreSwap, 100**feeDecimal)
    const preSwapTaxAmount = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(inputAmount.raw).quotient)
    console.log({
      inpttttt: inputAmount.toSignificant(inputCurrency.decimals),
      preswaptx: preSwapTaxAmount.toSignificant(inputCurrency.decimals),
      bigger: inputAmount > preSwapTaxAmount,
      preSwapTaxPercentage: preSwapTaxPercentage.toSignificant(10)
    })
    let amountIn = inputAmount.subtract(preSwapTaxAmount)

    // dexes usually take a trading fee
    const tradingFeePercentage = dex?.name.toLowerCase() !== 'pawswap' 
      ? new Percent('35', '1000') // most other dexs have  0.3% - .25% and pawswap will always take 0.03% so call it 0.35%
      : new Percent('20', '1000') // 0.2% trading fee on pawswap
    const tradingFeeAmount = new TokenAmount(inputToken, tradingFeePercentage.multiply(amountIn.raw).quotient)
    console.log({
      tradingFee: tradingFeePercentage.toSignificant(9)
    })
    if (side === 'buy') {
      amountIn = amountIn.subtract(tradingFeeAmount)
    }

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
    console.log({ amountRequiredToSwap: amountRequiredToSwap.toSignificant(6) })

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
    console.log({
      amountRequiredToSwapWithSlippage: amountRequiredToSwapWithSlippage.toSignificant(outputCurrency.decimals),
      amountRequiredToSwap: amountRequiredToSwap.toSignificant(outputCurrency.decimals)
    })
    const route = new Route([tokenPair], inputToken)
    const tradeWithSlippage = new Trade(route, amountRequiredToSwap, TradeType.EXACT_OUTPUT)
    const trade = new Trade(route, amountRequiredToSwapWithSlippage, TradeType.EXACT_OUTPUT)

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

    const preSwapWithSlippageTaxAmount = new TokenAmount(inputToken, preSwapTaxPercentage.multiply(trade.inputAmount.raw).quotient)
    trade.inputAmountSlippage = trade.inputAmount.add(preSwapWithSlippageTaxAmount)
    const tradingFeeAmountForSlippageTrade = new TokenAmount(inputToken, tradingFeePercentage.multiply(trade.inputAmountSlippage.raw).quotient)
    trade.inputAmountSlippage = trade.inputAmountSlippage.add(tradingFeeAmountForSlippageTrade)

    console.log({
      amountIn: amountIn.toSignificant(inputToken.decimals),
      amountInSlip: trade.inputAmountSlippage.toSignificant(inputToken.decimals),
      swapAmt: outputAmount.raw.toString(),
      swamt: trade.outputAmount.raw.toString()
    })
    console.log('INPUT --->>>>', amountIn.raw.toString())
    console.log('OUTPUT --->>>>', amountIn.raw.toString())

    trade.inputAmount = amountIn
    return trade
  }


  async function createTrade (params) {
    const ethers = Moralis.web3Library;
    const provider = ethers.getDefaultProvider('http://localhost:8545')
    const ethBalanceBeforeRaw = await provider.getBalance(account)
    console.log({ethBalanceBeforeRaw: ethBalanceBeforeRaw.toString()})
    if (estimatedSide === 'output' && !inputAmount) return
    if (estimatedSide === 'input' && !outputAmount) return
    setTradeIsLoading(true)
    const side = determineSide(inputCurrency)
    // const trade = estimatedSide === 'output' 
    //   ? await createExactInputTrade(side)
    //   : await createExactOutputTrade(side)
    
    let trade, isExactIn
    if (side === 'buy' && estimatedSide === 'output') {
      trade = await createBuyExactIn(params)
      isExactIn = true
    } else if (side === 'sell' && estimatedSide === 'output') {
      trade = await createSellExactIn(params)
      isExactIn = true
    } else if (side === 'buy' && estimatedSide === 'input') {
      trade = await createBuyExactOut(params)
      isExactIn = false
    } else {
      trade = await createSellExactOut(params)
      isExactIn = false
    }
    console.log({
      trade
    })
    // const trade = estimatedSide === 'output' ? await createExactInputTrade() : await createExactOutputTrade()
    setTrade({
      inputAmount,
      outputAmount,
      swap: trade,
      side,
      estimatedSide,
      taxes: tokenTaxStructureTaxes,
      isExactIn
    })
    setTradeIsLoading(false)
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

    const ethers = Moralis.web3Library;
    const provider = ethers.getDefaultProvider('http://localhost:8545')
    const ethBalanceBeforeRaw = await provider.getBalance(account)
    let ethBalanceBefore, tokenBalanceBefore, token

    try {
      if (side === 'buy') {
        token = await new web3Provider.Contract(
          outputCurrency.address,
          ERC20ABI,
          web3.getSigner()
        )
        const tokenBalanceBeforeRaw = await token.balanceOf(account)
        tokenBalanceBefore = new TokenAmount(outputToken, tokenBalanceBeforeRaw)
        ethBalanceBefore = new TokenAmount(inputToken, ethBalanceBeforeRaw)

        swapReq = await pawswap.buyOnPawSwap(
          swap.outputAmount.token.address,
          tokenTaxStructureTaxes.find(t => t.isCustom).buy,
          customTaxWallet ? customTaxWallet.address : account,
          '0',
          isExactIn 
          ? swap.outputAmountSlippage.raw.toString()
          : outputAmount.raw.toString(),
          isExactIn,
          {
            value: isExactIn
              ? inputAmount.raw.toString()
              : swap.inputAmountSlippage.raw.toString()
          }
        )
      } else {
        token = await new web3Provider.Contract(
          inputCurrency.address,
          ERC20ABI,
          web3.getSigner()
        )
        const tokenBalanceBeforeRaw = await token.balanceOf(account)
        tokenBalanceBefore = new TokenAmount(inputToken, tokenBalanceBeforeRaw)
        ethBalanceBefore = new TokenAmount(outputToken, ethBalanceBeforeRaw)

        swapReq = await pawswap.sellOnPawSwap(
          swap.inputAmount.token.address,
          isExactIn
            ? inputAmount.raw.toString() //Moralis.Units.Token(amountIn, tokenIn?.decimals)
            : swap.inputAmountSlippage.raw.toString(),
          tokenTaxStructureTaxes.find(t => t.isCustom).sell,
          customTaxWallet ? customTaxWallet.address : account,
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
      console.log('🌈🌈🌈🌈🌈🌈🌈')
      const tokenBalanceAfterRaw = await token.balanceOf(account)
      const tokenBalanceAfter = new TokenAmount(side === 'buy' ? outputToken : inputToken, tokenBalanceAfterRaw)
      const ethBalanceAfterRaw = await provider.getBalance(account)
      const ethBalanceAfter = new TokenAmount(side === 'buy' ? inputToken : outputToken, ethBalanceAfterRaw)

      // const tokenBalanceDiff = tokenBalanceAfter > tokenBalanceBefore
      //   ? tokenBalanceAfter.subtract(tokenBalanceBefore).toSignificant(18)
      //   : tokenBalanceBefore.subtract(tokenBalanceAfter).toSignificant(18)
      
      // const ethBalanceDiff = ethBalanceAfter > ethBalanceBefore
      //   ? ethBalanceAfter.subtract(ethBalanceBefore).toSignificant(18)
      //   : ethBalanceBefore.subtract(ethBalanceAfter).toSignificant(18)

      console.log({
        tokenBalanceBefore: tokenBalanceBefore.toSignificant(18),
        tokenBalanceAfter: tokenBalanceAfter.toSignificant(18),
        ethBalanceBefore: ethBalanceBefore.toSignificant(18),
        ethBalanceAfter: ethBalanceAfter.toSignificant(18)
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
    console.log({
      inputCurrency,
      outputCurrency
    })
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
      console.log({ sortedTokenPair })
      const pairAddress = await updatePair(
        sortedTokenPair.map(t => t.address), 
        dexForTrade.factory
      )
      console.log({ pairAddress })
      updatePairReserves(pairAddress)
    }
  }, [inputCurrency, outputCurrency, account])

  useEffect(() => {
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
    createTrade({
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
    pair,
    executeSwap,
    taxes: tokenTaxStructureTaxes,
    tokenTaxContractFeeDecimal,
    slippage,
    updateSlippage,
    highPriceImpactIgnored,
    updateIgnorePriceHighImpact,
    tradeIsLoading,
    getBuyAmountIn,
    updateCustomTaxPercentage,
    customTaxPercentage,
    updateCustomTaxWallet,
    currentBlock
  }
}

export default useSwapContext;
