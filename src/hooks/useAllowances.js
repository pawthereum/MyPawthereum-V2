import { useState, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import { ERC20ABI, MAX_BLOCKS_BEFORE_STALE } from '../constants'
import { networkConfigs } from 'helpers/networks';
import { notification } from 'antd'
import AppContext from 'AppContext';
import { JSBI, TokenAmount } from '@uniswap/sdk';

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

const useAllowances = () => {
  const { Moralis, account, web3, chainId } = useMoralis();
  const { currentBlock } = useContext(AppContext);
  const [allowances, setAllowances] = useState({})

  const allowanceWasCheckedWithinMaxBlocksBeforeStale = ({ token, spender }) => {
    if (!allowances[token.address] || !allowances[token.address][spender]) return false
    return Math.abs(currentBlock - allowances[token.address][spender].lastUpdated) <= MAX_BLOCKS_BEFORE_STALE
  }

  async function hasAllowance (params) {
    if (!chainId) return false
    const { amount, spender, token } = params
    console.log(params)

    if (allowanceWasCheckedWithinMaxBlocksBeforeStale(params)) {
      return JSBI.greaterThanOrEqual(allowances[token.address][spender].allowance.raw, amount.raw)
    }
    
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      token.address,
      ERC20ABI,
      web3.getSigner()
    )

    const tokenAllowance = await tokenContract.allowance(
      account,
      spender,
    )
    const allowanceAmount = new TokenAmount(token, tokenAllowance)
    // save data for future calls
    if (!allowances[token.address]) {
      allowances[token.address] = {}
    }
    allowances[token.address][spender] = {
      lastUpdated: currentBlock,
      allowance: new TokenAmount(token, tokenAllowance)
    }
    setAllowances(allowances)
    return JSBI.greaterThanOrEqual(allowanceAmount.raw, amount.raw)
  }

  async function updateAllowance (params) {
    const { amount, spender, token } = params
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      token.address,
      ERC20ABI, 
      web3.getSigner()
    )
    console.log(params)
    console.log(amount.raw.toString())

    try {
      const approveReq = await tokenContract.approve(
        spender,
        amount.raw.toString()
      )
      openNotification({
        message: "🔊 Approval Submitted!",
        description: `${approveReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + approveReq.hash
      });
      const tx = await approveReq.wait()

      // save data for future calls
      if (!allowances[token.address]) {
        allowances[token.address] = {}
      }
      allowances[token.address][spender] = {
        lastUpdated: currentBlock,
        allowance: amount
      }
      setAllowances(allowances)

      openNotification({
        message: "🎉 Approval Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Approval Error!",
        description: `${e.message}`
      });
    }
  }

  return {
    hasAllowance,
    updateAllowance
  }
}

export default useAllowances;