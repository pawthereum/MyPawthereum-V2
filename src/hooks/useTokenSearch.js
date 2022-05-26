
import { useEffect, useState } from 'react'
import { ERC20ABI, PAWSWAP } from '../constants'
import { useMoralis } from 'react-moralis'
import Web3 from 'web3'
import { tokenList } from 'constants/tokenList'
import { useERC20Balance } from './useERC20Balance'

const API_ENDPOINT = `https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/`

const pawswapListing = (address) => {
  return tokenList.tokens.find(t => t.address.toLowerCase() === address.toLowerCase())
}

const useSearchToken = (searchQuery) => {
  const { Moralis, chainId, web3 } = useMoralis()
  const { assets } = useERC20Balance()
  
  if (!searchQuery) {
    searchQuery = ''
  }
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!searchQuery) return
    const MIN_ADDR_LENGTH = 42
    if (searchQuery.length !== MIN_ADDR_LENGTH) return
    const web3Provider = Moralis.web3Library;
    const web3js = new Web3(Moralis.provider)
    const checkSummedAddress = web3js.utils.toChecksumAddress(searchQuery)
    const isAddress = web3Provider.utils.isAddress(checkSummedAddress)

    if (!isAddress) return //TODO: make this an error for the user but dont disrupt typing

    const isListed = async (tokenAddr) => {
      const pawswap = new web3Provider.Contract(
        PAWSWAP[chainId]?.address,
        PAWSWAP[chainId]?.abi,
        web3.getSigner()
      )
      const taxStruct = await pawswap.tokenTaxContracts(tokenAddr)
      return taxStruct !== '0x0000000000000000000000000000000000000000'
    }

    const getUserBalance = (tokenAddr) => {
      if (!assets) return '0'
      const asset = assets.find(a => a.token_address === tokenAddr.toLowerCase())
      if (!asset) return '0'
      return Moralis.Units.FromWei(asset.balance, asset.decimals)
    }

    const fetchData = async () => {
      // gets some data such as name, symbol, decimals with web3 api
      // this handles tokens that are not listed on coingecko
      const tokenContract = new web3Provider.Contract(
        checkSummedAddress,
        ERC20ABI,
        web3.getSigner()
      )
      let web3TokenData
      try {
        web3TokenData = await Promise.all([
          tokenContract.name(),
          tokenContract.symbol(),
          tokenContract.decimals()
        ])
      } catch (e) {
        return setData({ error: e })
      }
      // checks if there is a token tax contract
      const tokenIsListed = await isListed(checkSummedAddress)
      // checks if there is a hardcoded listing in the UI
      const listing = pawswapListing(checkSummedAddress)
      const userBalance = getUserBalance(checkSummedAddress)
      console.log({ userBalance })
      const tokenData = {
        name: web3TokenData[0],
        symbol: web3TokenData[1],
        address: checkSummedAddress,
        chainId,
        decimals: web3TokenData[2],
        logoURI: listing?.logoURI || null,
        typicalBuyTax: listing?.typicalBuyTax || 0,
        typicalSellTax: listing?.typicalSellTax || 0,
        color: listing?.color || null,
        isListed: tokenIsListed,
        userBalance
      }
      let coinGeckoTokenData = null
      try {
        const response = await fetch(API_ENDPOINT + searchQuery)
        coinGeckoTokenData = await response.json()
      } catch (error) {
        console.error('Unable to fetch token data:', error)
      }
      tokenData.coinGeckoTokenData = coinGeckoTokenData
      setData(tokenData)
    }
    fetchData()
  }, [setData, searchQuery])

  return data
}

export default useSearchToken