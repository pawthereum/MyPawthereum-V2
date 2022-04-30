import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokenList as defaultTokenList } from '../constants/tokenList'
import { PAWSWAP_FACTORY, PANCAKESWAP_FACTORY, PANCAKESWAP_ROUTER, PAWSWAP } from '../constants'
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
  const [taxes, setTaxes] = useState(null) 

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

  const fetchPairReserves = async (params) => {
    const web3Provider = Moralis.web3Library;

    const factoryContract = new web3Provider.Contract(
      params.exchangeAddress,
      params.exchangeAbi,
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
      return openNotification({
        message: "⚠️ Error getting reserves!",
        description: `${e.message} ${e.data?.message}`
      });
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
        sell: taxList[1]
      },
      {
        name: 'Liquidity Tax',
        buy: taxList[2],
        sell: taxList[3]
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

    const amount = amountPreTax - amountPreTax * totalTax / 10000

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
      amountOut,
      side,
      taxes
    })
  }

  async function executeSwap (trade) {
    const { tokenIn, tokenOut, amountIn, amountOut, side } = trade
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
          '0',
          { value: Moralis.Units.Token(amountIn, 18) }
        )
      } else {
        swapReq = await pawswap.sellOnPawSwap(
          tokenIn.address,
          Moralis.Units.Token(amountIn, tokenIn.decimals),
          '0',
          account,
          '0',
          '0',
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
    executeSwap,
    taxes,
  }
}

export default useSwapContext;
