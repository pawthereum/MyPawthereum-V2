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

  async function getTotalStaked () {
    if (!chainId) return

    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )

    try {
      const totalStaked = await stakingPoolContract.totalStaked()
      return Moralis.Units.FromWei(totalStaked, DECIMALS)
    } catch (e) {
      console.log('error getting total staked', e)
    }
  }

  async function getApy () {
    if (!chainId) return

    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )

    try {
      const accTokenPerShare = await stakingPoolContract.accTokenPerShare()
      const precisionFactor = await stakingPoolContract.PRECISION_FACTOR()
      return accTokenPerShare / precisionFactor
    } catch (e) {
      console.log('error getting apy', e)
    }
  }

  async function deposit (amount) {
    if (!chainId) return false
    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )

    try {
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
        message: "⚠️ Error viewing pending rewards!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function viewAmountStaked () {
    if (!chainId) return

    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const userInfo = await stakingPoolContract.userInfo(
        account
      )
      return Moralis.Units.FromWei(userInfo.amount, DECIMALS)
    } catch (e) {
      console.log('err', e)
      openNotification({
        message: "⚠️ Error viewing amount staked!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function compound () {
    if (!chainId) return
    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const performanceFee = await stakingPoolContract.performanceFee()
      const compoundReq = await stakingPoolContract.compoundReward(
        { value: performanceFee }
      )
      openNotification({
        message: "🔊 Compound Submitted!",
        description: `${compoundReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + compoundReq.hash
      })
      const tx = await compoundReq.wait()
      openNotification({
        message: "🎉 Compound Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Compound Error!",
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
      const claimReq = await stakingPoolContract.claimReward(
        { value: performanceFee }
      )
      openNotification({
        message: "🔊 Claim Submitted!",
        description: `${claimReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + claimReq.hash
      })
      const tx = await claimReq.wait()
      openNotification({
        message: "🎉 Claim Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Claim Error!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  async function withdraw (amount) {
    if (!chainId) return
    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const claimReq = await stakingPoolContract.withdraw(
        Moralis.Units.Token(amount, DECIMALS)
      )
      openNotification({
        message: "🔊 Withdraw Submitted!",
        description: `${claimReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + claimReq.hash
      })
      const tx = await claimReq.wait()
      openNotification({
        message: "🎉 Withdraw Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Withdraw Error!",
        description: `${e.message} ${e.data?.message}`
      });
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

  return { deposit, claim, compound, withdraw, viewAmountStaked, getApy, getTotalStaked, hasAllowance, updateAllowance, viewPendingReward };
}

export default useStakingPool;
