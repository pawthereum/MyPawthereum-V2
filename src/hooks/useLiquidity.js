import { useState, useEffect } from 'react'
import { PAWSWAP_FACTORY } from "../constants";
import { useMoralis } from "react-moralis";
import { networkConfigs } from "helpers/networks";
import { notification } from 'antd';
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import useNative from './useNative';

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

const useLiquidity = () => {
  const { chainId, account, Moralis, web3 } = useMoralis()
  const [weth, setWeth] = useState(null)

  useEffect(() => {
    setWeth(networkConfigs[chainId]?.wrapped)
  }, [chainId])

  const sortTokens = (tokenList) => {
    return tokenList.sort((a, b) => a.address > b.address ? 1 : -1)
  }

  const getPawswapPair = (tokenAddr) => {
    const web3Provider = Moralis.web3Library;
    const sortedTokens = sortTokens([tokenAddr, weth])
    console.log({ sortedTokens })
    const pairAddress = getCreate2Address(
      web3Provider.utils.getAddress(PAWSWAP_FACTORY[chainId]?.address),
      keccak256(['bytes'], [pack(['address', 'address'], [
        web3Provider.utils.getAddress(sortedTokens[0]), 
        web3Provider.utils.getAddress(sortedTokens[1])
      ])]),
      PAWSWAP_FACTORY[chainId]?.initCodeHash
    )
    console.log('liq pair', pairAddress)
    return pairAddress
  }

  const getPairTotalSupply = async (pairAddress) => {
    const web3Provider = Moralis.web3Library;
    const pairContract = new web3Provider.Contract(
      pairAddress,
      ["function totalSupply() external view returns (uint256 totalSupply)"],
      web3.getSigner()
    )
    try {
      const totalSupply = await pairContract.totalSupply()
      return totalSupply
    } catch (e) {
      console.log('error getting pair total supply', e)
      return openNotification({
        message: "⚠️ Error getting pair total supply!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const getPairReserves = async (pairAddress) => {
    const web3Provider = Moralis.web3Library;
    const pairContract = new web3Provider.Contract(
      pairAddress,
      ["function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"],
      web3.getSigner()
    )
    try {
      const pairReserves = await pairContract.getReserves()
      console.log('reserves', pairReserves)
      return pairReserves
    } catch (e) {
      console.log('error getting reserves', e)
      return openNotification({
        message: "⚠️ Error getting reserves!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  // const getPawswapPair = (tokenAddr) => {
  //   const web3Provider = Moralis.web3Library;
  //   const factory = new web3Provider.Contract(
  //     PAWSWAP_FACTORY[chainId]?.address,
  //     PAWSWAP_FACTORY[chainId]?.abi,
  //     web3.getSigner()
  //   )
  //   try {
  //     return factory.getPair(tokenAddr, weth)
  //   } catch (e) {
  //     console.log('error getting pawswap pair', e)
  //     return openNotification({
  //       message: "⚠️ Error getting pawswap pair!",
  //       description: `${e.message} ${e.data?.message}`
  //     });
  //   }
  // }

  return {
    getPawswapPair,
    getPairReserves,
    getPairTotalSupply
  }
}

export default useLiquidity;