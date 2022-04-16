import { useMoralis } from 'react-moralis'
import { STAKING_POOL, DECIMALS, PAWTH_ADDRESS, ERC20ABI } from '../constants'
import { networkConfigs } from 'helpers/networks';
import { notification } from "antd";

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

const useStakingPool = () => {
  const { Moralis, account, web3, chainId } = useMoralis(); 

  async function deposit (amount) {
    if (!chainId) return false
    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )

    try {
      console.log('performanceFee', Moralis.Units.Token(amount, DECIMALS))
      const depositReq = await stakingPoolContract.deposit(
        Moralis.Units.Token(amount, DECIMALS)
      )
      openNotification({
        message: "🔊 Deposit Submitted!",
        description: `${depositReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + depositReq.hash
      })
      const tx = await depositReq.wait()
      openNotification({
        message: "🎉 Deposit Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Deposit Error!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function viewPendingReward () {
    if (!chainId) return

    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const pendingReward = await stakingPoolContract.pendingReward(
        account
      )
      return Moralis.Units.FromWei(pendingReward, DECIMALS)
    } catch (e) {
      console.log('err', e)
      openNotification({
        message: "⚠️ Error viewing Pending Rewards!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function claim () {
    if (!chainId) return
    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const performanceFee = await stakingPoolContract.performanceFee()
      console.log('performanceFee', performanceFee)
      const claimReq = await stakingPoolContract.claimReward(
        { value: performanceFee }
      )
    } catch (e) {
      console.log('err', e)
    }
  }

  async function hasAllowance (amount) {
    if (!chainId) return false
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      PAWTH_ADDRESS[chainId],
      ERC20ABI, 
      web3.getSigner()
    )

    const tokenAllowance = await tokenContract.allowance(
      account,
      STAKING_POOL[chainId].address,
    )

    return parseInt(amount) <= Moralis.Units.FromWei(tokenAllowance, DECIMALS)
  }

  async function hasAllowance (amount) {
    if (!chainId) return false
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      PAWTH_ADDRESS[chainId],
      ERC20ABI, 
      web3.getSigner()
    )

    const tokenAllowance = await tokenContract.allowance(
      account,
      STAKING_POOL[chainId].address,
    )

    return parseInt(amount) <= Moralis.Units.FromWei(tokenAllowance, DECIMALS)
  }

  async function updateAllowance (amount) {
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      PAWTH_ADDRESS[chainId],
      ERC20ABI, 
      web3.getSigner()
    )

    try {
      const approveReq = await tokenContract.approve(
        STAKING_POOL[chainId].address,
        Moralis.Units.Token(amount, DECIMALS).toString()
      )
      openNotification({
        message: "🔊 Approval Submitted!",
        description: `${approveReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + approveReq.hash
      });
      const tx = await approveReq.wait()
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

  return { deposit, claim, hasAllowance, updateAllowance, viewPendingReward };
}

export default useStakingPool;
