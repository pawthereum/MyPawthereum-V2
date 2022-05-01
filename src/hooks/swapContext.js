import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokenList as defaultTokenList } from '../constants/tokenList'
import { PAWSWAP_ROUTER, PANCAKESWAP_ROUTER, PAWSWAP, DEFAULT_SLIPPAGE, PAWSWAP_FACTORY, PANCAKESWAP_FACTORY } from '../constants'
import { notification } from 'antd'
import { networkConfigs } from 'helpers/networks'
import { taxStructureAbi } from 'constants/abis/taxStructure'

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
  const [estimatedSide, setEstimatedSide] = useState(null)
  const [inputCurrency, setInputCurrency] = useState(null)
  const [inputAmount, setInputAmount] = useState(null)
  const [outputCurrency, setOutputCurrency] = useState(null)
  const [outputAmount, setOutputAmount] = useState(null)
  const [trade, setTrade] = useState(null)
  const [tokenList, setTokenList] = useState([])
  const [tokenTaxContract, setTokenTaxContract] = useState(null)
  const [tokenTaxContractFeeDecimal, setTokenTaxContractFeeDecimal] = useState(null)
  const [taxes, setTaxes] = useState(null)
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE)
  const [tradeIsLoading, setTradeIsLoading] = useState(false)

  const updateSlippage = (amt) => {
    setSlippage(Number(amt) / 100)
  }

  const updateEstimatedSide = (side) => {
    setEstimatedSide(side)
  }

  const determineSide = (inputCurrency) => {
    const nativeAddr = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    if (inputCurrency.address.toLowerCase() === nativeAddr) return 'buy'
    return inputCurrency.address.toLowerCase() === networkConfigs[chainId].wrapped?.toLowerCase() ? 'buy' : 'sell'
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
    
    if (params.estimatedSide === 'output') {
      try {
        const amounts = await routerContract.getAmountsOut(
          params.amount,
          [params.inputCurrency.address, params.outputCurrency.address]
        )
        return Moralis.Units.FromWei(amounts[1], params.outputCurrency?.decimals)
      } catch (e) {
        console.log('error getting quote', e)
        openNotification({
          message: "⚠️ Error Fetching Quote!",
          description: `${e.message} ${e.data?.message}`
        });
      }
    } else {
      try {
        const amounts = await routerContract.getAmountsIn(
          params.amount
          [params.outputCurrency.address, params.inputCurrency.address]
        )
        return Moralis.Units.FromWei(amounts[0], params.inputCurrency?.decimals)
      } catch (e) {
        console.log('error getting quote')
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
      const taxes = await getTaxes(newStruct)
      setTaxes(taxes)
      return { taxStructureContract: newStruct, taxes }
    } catch (e) {
      console.log('error getting token tax contract')
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
      console.log('pair address', pairAddress)
      const pairContract = new web3Provider.Contract(
        pairAddress,
        [ "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"],
        web3.getSigner()
      )
      return await pairContract.getReserves()

    } catch (e) {
      console.log('error getting reserves', e)
      return openNotification({
        message: "⚠️ Error getting reserves!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function createTrade (params) {
    console.log('params', params)
    setTradeIsLoading(true)
    const routerAddress = inputCurrency.dex === 'pancakeswap' 
      ? PANCAKESWAP_ROUTER[chainId]?.address
      : PAWSWAP_ROUTER[chainId]?.address
    
    const routerAbi = inputCurrency === 'pancakeswap'
      ? PANCAKESWAP_ROUTER[chainId]?.abi
      : PAWSWAP_ROUTER[chainId]?.abi

    const side = determineSide(inputCurrency)

    const tokenRequiringTaxStructure = side === 'buy' ? outputCurrency : inputCurrency
    const taxStructure = await fetchTaxStructure(tokenRequiringTaxStructure.address)
    const { taxStructureContract, taxes } = taxStructure

    const totalTax = taxes.reduce((p, t) => {
      return p + Number(t[side])
    }, 0)

    const amountPreTax = estimatedSide === 'input' 
      ? Number(Moralis.Units.FromWei(outputAmount, outputCurrency?.decimals))
      : Number(Moralis.Units.FromWei(inputAmount, inputCurrency?.decimals))

    const feeDecimal = await taxStructureContract.feeDecimal()
    setTokenTaxContractFeeDecimal(feeDecimal)
    const amount = amountPreTax - amountPreTax * totalTax / 100**feeDecimal
    
    const MAX_DECIMALS = 18
    const amountWei = estimatedSide === 'input' 
      ? Moralis.Units.Token(amount.toFixed(MAX_DECIMALS), outputCurrency?.decimals)
      : Moralis.Units.Token(amount.toFixed(MAX_DECIMALS), inputCurrency?.decimals)

    let amountOut = await fetchQuote({
      routerAddress,
      routerAbi,
      inputCurrency,
      outputCurrency,
      amount: amountWei,
      side,
      estimatedSide
    })

    // liquidity taxes aren't accounted for in quotes
    const liqTaxSearch = taxes.find(t => t.isLiquidity)
    const liqTax = !liqTaxSearch ? 0 : Number(liqTaxSearch[side]) / 100**feeDecimal
    
    if (liqTax > 0) {
      amountOut = Number(amountOut) - Number(amountOut) * liqTax
    }

    const amountOutSlippage = Moralis.Units.Token(
      (amountOut * (1 - slippage)).toFixed(outputCurrency.decimals),
      outputCurrency.decimals
    )

    const amountIn = estimatedSide === 'input'
      ? inputAmount
      : Moralis.Units.FromWei(inputAmount, inputCurrency?.decimals)
    
    // get price impact
    // https://dailydefi.org/articles/price-impact-and-how-to-calculate/
    const factoryAddress = inputCurrency.dex === 'pancakeswap' 
      ? PANCAKESWAP_FACTORY[chainId]?.address
      : PAWSWAP_FACTORY[chainId]?.address
    
    const factoryAbi = inputCurrency === 'pancakeswap'
      ? PANCAKESWAP_FACTORY[chainId]?.abi
      : PAWSWAP_FACTORY[chainId]?.abi

    const pairReserves = await fetchPairReserves({
      token0: inputCurrency.address,
      token1: outputCurrency.address,
      factoryAddress,
      factoryAbi
    })

    const token0Reserves =  Number(Moralis.Units.FromWei(pairReserves[0], inputCurrency?.decimals))
    const token1Reserves = Number(Moralis.Units.FromWei(pairReserves[1], outputCurrency?.decimals))
    const k = token0Reserves * token1Reserves

    const token0ReservesAfterSwap = token0Reserves + Number(amountIn)
    const token1ReservesAfterSwap = k / token0ReservesAfterSwap
    const priceBefore = token0Reserves / token1Reserves
    const priceAfter = token0ReservesAfterSwap / token1ReservesAfterSwap
    const priceImpact = (priceAfter - priceBefore) / priceBefore * 100 

    setTradeIsLoading(false)
    if (tradeNonce - 1 !== params.nonce) return false
    setTrade({
      tokenIn: inputCurrency,
      tokenOut: outputCurrency,
      amountIn,
      amountOut,
      amountOutSlippage,
      side,
      taxes,
      priceImpact
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
    if (!inputAmount && !outputAmount) return
    if (inputAmount === "0" && !outputAmount) return
    if (!inputAmount && outputAmount === "0") return
    if (!inputCurrency || !outputCurrency) return

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

  }, [inputAmount, outputAmount, inputCurrency, outputCurrency, slippage])

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
    taxes,
    tokenTaxContractFeeDecimal,
    slippage,
    updateSlippage,
    tradeIsLoading
  }
}

export default useSwapContext;
