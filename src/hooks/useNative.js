import { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { networkConfigs } from "helpers/networks";
import { Token } from '@uniswap/sdk'
import Web3 from "web3"; 

const useNative = () => {
  const { Moralis, chainId, account } = useMoralis()
  const Web3Api = useMoralisWeb3Api();
  const [nativeSymbol, setNativeSymbol] = useState()
  const [wrappedAddress, setWrappedAddress] = useState(null)
  const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  const unsupportedChains = ['0x539']
  useEffect(() => {
    const web3js = new Web3(Moralis.provider)
    const checkSummedAddress = web3js.utils.toChecksumAddress(
      networkConfigs[chainId]?.wrapped
    )
    setWrappedAddress(checkSummedAddress)
  }, [chainId])

  const isNative = (address) => 
    !address ? false :
    address.toLowerCase() === nativeAddress ||
    address.toLowerCase() === networkConfigs[chainId]?.wrapped.toLowerCase()
  
  const getNativeBalance = async () => {
    if (!account || !chainId) return
    if (unsupportedChains.includes(chainId)) {
      const web3js = await new Web3(Moralis.provider)
      const balanceReq = await web3js.eth.getBalance(account)
      return balanceReq
    }
    const balanceReq = await Web3Api.account.getNativeBalance({
      chain: chainId,
      address: account
    })
    return balanceReq?.balance
  }
  
  const getWrappedNativeToken = () => {
    if (!chainId) return null
    const web3Provider = Moralis.web3Library;
    return new Token(
      chainId,
      web3Provider.utils.getAddress(networkConfigs[chainId]?.wrapped),
      18,
      'W' + networkConfigs[chainId]?.currencySymbol,
      'Wrapped' + networkConfigs[chainId]?.currencyName
    )
  }

  useEffect(() => {
    if (!chainId) setNativeSymbol(null)
    setNativeSymbol(networkConfigs[chainId]?.currencySymbol)
  }, [chainId])
  
  return {
    nativeSymbol,
    getNativeBalance,
    getWrappedNativeToken,
    isNative,
    nativeAddress,
    wrappedAddress
  }
}

export default useNative;