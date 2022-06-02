import { useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { TokenAmount, JSBI } from '@uniswap/sdk'
import useNative from './useNative';
import { getCharityByCustomWallet } from './useCustomWallets'

function useLeaderboard () {
  const { Moralis, chainId } = useMoralis();
  const { getWrappedNativeToken } = useNative();
  const [buys, setBuys] = useState(null)
  const [sells, setSells] = useState(null)
  const [charityLeaderBoard, setCharityLeaderboard] = useState([])
  const [charityData, setCharityData] = useState({})

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
    console.log(buyData)
    setBuys(buyData)
  }, [buyData])

  useEffect(() => {
    console.log(sellData)
    setSells(sellData)
  }, [sellData])

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
      console.log({ donons: charities[t.attributes.customTaxAddress].donations })
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
      console.log(`${key}: ${charities[key]}`)
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
    console.log({charities, charityArray, sortedCharities })
    setCharityLeaderboard(sortedCharities)
  }

  useEffect(() => {
    if (!buys || !sells) return
    createCharityLeaderboard(buys.concat(sells))
  }, [buys, sells])

  // useEffect(() => {

  // }, [sellData])

  return {
    charityLeaderBoard
  }
}

export default useLeaderboard