import { useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Token, TokenAmount, JSBI, Fetcher } from '@uniswap/sdk'
import useNative from './useNative';
import { getCharityByCustomWallet } from './useCustomWallets'
import useInchDex from './useInchDex'
import { tokenList as defaultTokenList } from '../constants/tokenList'

function useLeaderboard () {
  const { Moralis, chainId, web3 } = useMoralis();
  const { getWrappedNativeToken } = useNative();
  const { tokenList: oneInchTokenList } = useInchDex(chainId)
  const [buys, setBuys] = useState(null)
  const [sells, setSells] = useState(null)
  const [charityLeaderboard, setCharityLeaderboard] = useState([])
  const [charityData, setCharityData] = useState({})
  const [tokenLeaderboard, setTokenLeaderboard] = useState([])

  const web3Provider = Moralis.web3Library;
  const eth = getWrappedNativeToken()

  const buysTableName = chainId === chainId ? 'PawswapBuy' :'PawswapBuy' //TODO: change for eth and bsc
  const sellsTableName = chainId === chainId ? 'PawswapSells' : 'PawswapSells'
  
  const { data: buyData, error: buyError, isLoading: buyIsLoading } = useMoralisQuery(
    buysTableName,
    query => query
      .notEqualTo('customTaxAmount', '0')
      .equalTo('confirmed', true),
    []
  )

  const { data: sellData, error: sellError, isLoading: sellIsLoading } = useMoralisQuery(
    sellsTableName,
    query => query
      .notEqualTo('customTaxAmount', '0')
      .equalTo('confirmed', true),
    []
  )

  useEffect(() => {
    setBuys(buyData)
  }, [buyData])

  useEffect(() => {
    setSells(sellData)
  }, [sellData])

  const getTokenAsset = async (address) => {
    // get the token from the hard coded listed tokens
    const tokenInList = defaultTokenList.tokens.find(t => t.address.toLowerCase() === address.toLowerCase())
    if (tokenInList) {
      return {
        metadata: tokenInList,
        token: new Token(
          chainId,
          address,
          tokenInList.decimals,
          tokenInList.symbol,
          tokenInList.name
        )
      }
    }
    // get the token from one inch if they have it
    if (oneInchTokenList[address]) {
      return {
        metadata: oneInchTokenList[address],
        token: new Token(
          chainId,
          address,
          oneInchTokenList[address].decimals,
          oneInchTokenList[address].symbol,
          oneInchTokenList[address].name
        )
      }
    }
    // fetch it on chain if nobody else has it
    return {
      metadata: null,
      token: await Fetcher.fetchTokenData(chainId, web3.getSigner())
    }
  }

  const createTokenLeaderboard = async (transactions) => {
    const tokenArray = []
    const tokens = {}
    for (let i = 0; i < transactions.length; i++) {
      const t = transactions[i]
      if (!tokens[t.attributes.tokenAddress]) {
        const asset = await getTokenAsset(t.attributes.tokenAddress)
        tokens[t.attributes.tokenAddress] = {
          totalDonated: new TokenAmount(eth, 0),
          sellsDonated: new TokenAmount(eth, 0),
          buysDonated: new TokenAmount(eth, 0),
          donations: [],
          tokenData: asset
        }
      }
      tokens[t.attributes.tokenAddress].totalDonated =
      tokens[t.attributes.tokenAddress].totalDonated.add(
        new TokenAmount(eth, t.attributes.customTaxAmount)
      )
      tokens[t.attributes.tokenAddress].donations.push(t)
      if (t.className === buysTableName) {
        tokens[t.attributes.tokenAddress].buysDonated =
        tokens[t.attributes.tokenAddress].buysDonated.add(
          new TokenAmount(eth, t.attributes.customTaxAmount)
        )
      }
      if (t.className === sellsTableName) {
        tokens[t.attributes.tokenAddress].sellsDonated =
        tokens[t.attributes.tokenAddress].sellsDonated.add(
          new TokenAmount(eth, t.attributes.customTaxAmount)
        )
      }
    }
    for (const key in tokens) {
      const token = {
        address: key,
        totalDonated: tokens[key].totalDonated,
        buysDonated: tokens[key].buysDonated,
        sellsDonated: tokens[key].sellsDonated,
        donations: tokens[key].donations,
        tokenData: tokens[key].tokenData
      }
      tokenArray.push(token)
    }
    const sortedTokens = tokenArray.sort((a, b) => {
      return JSBI.greaterThan(a.totalDonated.raw, b.totalDonated.raw) ? -1 : 1
    })
    setTokenLeaderboard(sortedTokens)
  }

  const createCharityLeaderboard = async (transactions) => {
    const charityArray = []
    const charities = {}
    transactions.map(async t => {
      if (!charities[t.attributes.customTaxAddress]) {
        charities[t.attributes.customTaxAddress] = {
          totalReceived: new TokenAmount(eth, 0),
          sellsReceived: new TokenAmount(eth, 0),
          buysReceived: new TokenAmount(eth, 0),
          donations: []
        }
      }
      charities[t.attributes.customTaxAddress].totalReceived =
      charities[t.attributes.customTaxAddress].totalReceived.add(
        new TokenAmount(eth, t.attributes.customTaxAmount)
      )
      charities[t.attributes.customTaxAddress].donations.push(t)
      if (t.className === buysTableName) {
        charities[t.attributes.customTaxAddress].buysReceived =
        charities[t.attributes.customTaxAddress].buysReceived.add(
          new TokenAmount(eth, t.attributes.customTaxAmount)
        )
      }
      if (t.className === sellsTableName) {
        charities[t.attributes.customTaxAddress].sellsReceived =
        charities[t.attributes.customTaxAddress].sellsReceived.add(
          new TokenAmount(eth, t.attributes.customTaxAmount)
        )
      }
    })
    for (const key in charities) {
      const charity = {
        address: key,
        totalReceived: charities[key].totalReceived,
        buysReceived: charities[key].buysReceived,
        sellsReceived: charities[key].sellsReceived,
        donations: charities[key].donations
      }
      if (charityData[charity.address.toLowerCase()]) {
        charity.charityData = charityData[charity.address.toLowerCase()]
      } else {
        charity.charityData = await getCharityByCustomWallet(
          web3Provider.utils.getAddress(charity.address) // checksum the address
        )
        charityData[charity.address.toLowerCase()] = charity.charityData // save in case we need it again
      }
      charityArray.push(charity)
    }
    const sortedCharities = charityArray.sort((a, b) => {
      return JSBI.greaterThan(a.totalReceived.raw, b.totalReceived.raw) ? -1 : 1
    })
    setCharityLeaderboard(sortedCharities)
  }

  useEffect(() => {
    if (!buys || !sells) return
    createCharityLeaderboard(buys.concat(sells))
    createTokenLeaderboard(buys.concat(sells))
  }, [buys, sells])

  // useEffect(() => {

  // }, [sellData])

  return {
    charityLeaderboard,
    tokenLeaderboard
  }
}

export default useLeaderboard