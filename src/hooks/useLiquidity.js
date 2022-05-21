import { useContext, useState } from "react";
import { PAWSWAP_FACTORY, PAWSWAP_ROUTER } from "../constants";
import { useMoralis } from "react-moralis";
import { notification } from 'antd';
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import useNative from './useNative';
import AppContext from "AppContext";
import { networkConfigs } from "helpers/networks";
import { TokenAmount } from "@uniswap/sdk";

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
  const { estimatedSide, trade, outputAmount, inputAmount } = useContext(AppContext)
  const { chainId, Moralis, web3, account } = useMoralis()
  const { wrappedAddress, isNative } = useNative()
  const [lpTokenRemovalData, setLpTokenRemovalData] = useState(null)
  const [showRemoveLiquidity, setShowRemoveLiquidity] = useState(false)

  const sortTokens = (tokenList) => {
    return tokenList.sort((a, b) => a.address > b.address ? 1 : -1)
  }

  const updateShowRemoveLiquidity = shouldShow => {
    setShowRemoveLiquidity(shouldShow)
  }

  const updateLpTokenRemovalData = data => {
    setLpTokenRemovalData(data)
  }

  const getPawswapPair = (tokenAddr) => {
    const web3Provider = Moralis.web3Library;
    const sortedTokens = sortTokens([tokenAddr, wrappedAddress])
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

  const removeLiquidity = async (params) => {
    const { token, lpToken, percentage } = params
    const web3Provider = Moralis.web3Library;

    const routerContract = new web3Provider.Contract(
      PAWSWAP_ROUTER[chainId]?.address,
      PAWSWAP_ROUTER[chainId]?.abi,
      web3.getSigner()
    )
    
    // TODO: gotta get this stuff
    // const lpTokenBalance = new TokenAmount(lpToken, )
    // const percentageToRemove = new Percentage(percentage, 100)
    // const amountToRemove = new TokenAmount(lpToken, percentageToRemove.multiply(lpTokenBalance).quotient)

    try {
      const removeRequest = await routerContract.removeLiquidityETHSupportingFeeOnTransferTokens(
        token?.address,
        '100',//amountToRemove.raw.toString(),
        0,
        0,
        account,
        parseInt(new Date().getTime() / 1000 + 50000)
      )
      openNotification({
        message: "🔊 Liquidity Removal Submitted!",
        description: `${removeRequest.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + removeRequest.hash
      })
    } catch (e) {
      console.log({ e })
    }
  }

  const addLiquidity = async () => {
    console.log('adding...')
    const web3Provider = Moralis.web3Library;
    console.log('adding here 124..')
    console.log({
      r: PAWSWAP_ROUTER[chainId]?.address,
      a: PAWSWAP_ROUTER[chainId]?.abi,
    })
    const routerContract = new web3Provider.Contract(
      PAWSWAP_ROUTER[chainId]?.address,
      PAWSWAP_ROUTER[chainId]?.abi,
      web3.getSigner()
    )
    console.log('adding here..')
    try {
      console.log('adding again...')
      console.log({ trade })
      const ethAmtIn = trade.side === 'sell'
        ? estimatedSide === 'output' ? trade.swap.outputAmount : outputAmount
        : estimatedSide === 'output' ? inputAmount : trade.swap.inputAmount
      
      const tokenAmtIn = trade.side === 'sell'
        ? estimatedSide === 'output' ? inputAmount : trade.swap.inputAmount
        : estimatedSide === 'output' ? outputAmount : trade.swap.outputAmount
      // const ethAmtIn = trade.side === 'sell' 
      //   ? trade.estimatedSide === 'output'
      //     ? outputAmount
      //     : trade.swap.outputAmount
      //   : inputAmount
      const token = trade.side === 'sell'
        ? trade.swap.inputAmount.token
        : trade.swap.outputAmount.token
      // const tokenAmtIn = trade.side === 'sell'
      //   ? inputAmount
      //   : trade.estimatedSide === 'output'
      //     ? outputAmount
      //     : trade.swap.outputAmount
      
      console.log({
        e: ethAmtIn.raw.toString(),t: tokenAmtIn.raw.toString(), ta: token.address
      })
      // console.log(Moralis.Units.Token(trade[ethAmtIn], 18))

      const addRequest = await routerContract.addLiquidityETH(
        token?.address,
        tokenAmtIn.raw.toString(),
        0,
        0,
        account,
        parseInt(new Date().getTime() / 1000 + 50000),
        { value: ethAmtIn.raw.toString() }
      )
      openNotification({
        message: "🔊 Liquidity Add Submitted!",
        description: `${addRequest.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + addRequest.hash
      })
      try {
        const tx = await addRequest.wait()
        openNotification({
          message: "🎉 Liquidity Add Complete!",
          description: `${tx.transactionHash}`,
          link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
        })
      } catch (e) {
        openNotification({
          message: "⚠️ Error adding liquidity!",
          description: `${e.message} ${e.data?.message}`
        });
      }
    } catch (e) {
      console.log('error adding liquidity', e)
      openNotification({
        message: "⚠️ Error adding liquidity!",
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
    addLiquidity,
    getPawswapPair,
    getPairReserves,
    getPairTotalSupply,
    updateLpTokenRemovalData,
    updateShowRemoveLiquidity,
    showRemoveLiquidity
  }
}

export default useLiquidity;