import { useEffect, useState, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import AppContext from 'AppContext';
import { STAKING_POOL, DECIMALS, PAWTH_ADDRESS, ERC20ABI } from '../constants'
import { networkConfigs } from 'helpers/networks';
import { notification } from "antd";
import { Token, TokenAmount, Percent } from '@uniswap/sdk'

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

const roundBig = (number) => {
  if (!number) return 0

  return Math.abs(Number(number)) >= 1.0e+9
  
  ? (Math.abs(Number(number)) / 1.0e+9).toPrecision(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(number)) >= 1.0e+6

  ? (Math.abs(Number(number)) / 1.0e+6).toPrecision(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(number)) >= 1.0e+3

  ? (Math.abs(Number(number)) / 1.0e+3).toPrecision(2) + "K"

  : Math.abs(Number(number));
}

const useStakingPool = () => {
  const { Moralis, account, web3, chainId } = useMoralis(); 
  const { currentBlock } = useContext(AppContext);
  const [pendingDividend, setPendingDividend] = useState(null)
  const [pendingRewards, setPendingRewards] = useState(null)
  const [apr, setApr] = useState(null)
  const [totalStaked, setTotalStaked] = useState(null)
  const [amountStaked, setAmountStaked] = useState(null)

  useEffect(() => {
    if (!web3 || !account || !currentBlock) return
    refreshAwards()
    async function refreshAwards() {
      const requests = await Promise.all([
        viewPendingReward(),
        viewPendingDividend(),
        viewAmountStaked(),
        getApr(currentBlock),
        getTotalStaked()
      ])
      const refreshedRewards = requests[0]
      const refreshedDividends = requests[1]
      const amountStaked = requests[2]
      const apr = requests[3]
      const totalStaked = requests[4]
      if (refreshedRewards) {
        setPendingRewards(parseFloat(refreshedRewards).toLocaleString([], {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }))
      }
      if (refreshedDividends) {
        setPendingDividend(parseFloat(refreshedDividends).toLocaleString([], {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }))
      }
      if (apr) {
        setApr(apr.toLocaleString([], {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }))
      }
      if (totalStaked) {
        setTotalStaked(roundBig(parseInt(totalStaked)))
      }
      setAmountStaked(amountStaked)
    }
  }, [account, currentBlock, web3])

  async function getTotalStaked () {
    if (!chainId || !web3) return

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

  async function getApr (currentBlock) {
    if (!chainId) return

    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )

    try {
      const stakingInfo = await Promise.all([
        stakingPoolContract.accTokenPerShare(),
        stakingPoolContract.PRECISION_FACTOR(),
        stakingPoolContract.lastRewardBlock(),
        stakingPoolContract.rewardPerBlock(),
        stakingPoolContract.bonusEndBlock(),
        stakingPoolContract.totalStaked()
      ])
      const accTokenPerShare = stakingInfo[0]
      const precisionFactor = stakingInfo[1]
      const lastRewardBlock = stakingInfo[2]
      const rewardPerBlock = stakingInfo[3]
      const bonusEndBlock = stakingInfo[4]
      const totalStaked = stakingInfo[5]

      if (currentBlock > lastRewardBlock && totalStaked != 0 && lastRewardBlock > 0) {
        const getMultiplier = (from, to) => {
          if (to <= bonusEndBlock) return to - from
          if (from >= bonusEndBlock) return 0
          return bonusEndBlock - from
        }
  
        const multiplier = getMultiplier(lastRewardBlock, currentBlock)
        const pawthReward = multiplier * rewardPerBlock
        const adjustedTokenPerShare = accTokenPerShare + pawthReward * precisionFactor / totalStaked
        const reward = adjustedTokenPerShare / precisionFactor
        return reward * 100
      }

      const reward = accTokenPerShare / precisionFactor
      return reward * 100

    } catch (e) {
      console.log('error getting r', e)
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
      // Update UI of amount staked immediately
      const pawthToken = new Token(chainId, PAWTH_ADDRESS[chainId], DECIMALS)
      const prevAmountStaked = new TokenAmount(
        pawthToken,
        Moralis.Units.Token(amountStaked, DECIMALS)
      )
      const depositFee = new Percent(2, 100)
      const amountAddedToStake = new TokenAmount(
        pawthToken,
        Moralis.Units.Token(amount, DECIMALS)
      )
      const depositFeeAmount = new TokenAmount(
        pawthToken,
        depositFee.multiply(amountAddedToStake.raw).quotient
      )
      const amountAddedAfterFee = amountAddedToStake.subtract(depositFeeAmount)
      console.log(
        'Moralis units',
        Moralis.Units.FromWei(prevAmountStaked.add(amountAddedAfterFee).raw.toString(), DECIMALS)
      )
      console.log(
        'another amount',
        prevAmountStaked.add(amountAddedAfterFee).raw.toString()
      )
      setAmountStaked(
        Moralis.Units.FromWei(
          prevAmountStaked.add(amountAddedAfterFee).raw.toString(), DECIMALS
        )
      )
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

  async function viewPendingDividend () {
    if (!chainId) return

    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const pendingDividend = await stakingPoolContract.pendingDividends(
        account
      )
      return Moralis.Units.FromWei(pendingDividend, DECIMALS)
    } catch (e) {
      console.log('err', e)
      openNotification({
        message: "⚠️ Error viewing pending dividends!",
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

  async function claimReward () {
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
      setPendingRewards(0)
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

  async function claimDividend () {
    if (!chainId) return
    const web3Provider = Moralis.web3Library;

    const stakingPoolContract = new web3Provider.Contract(
      STAKING_POOL[chainId]?.address,
      STAKING_POOL[chainId]?.abi, 
      web3.getSigner()
    )
    try {
      const performanceFee = await stakingPoolContract.performanceFee()
      const claimReq = await stakingPoolContract.claimDividend(
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

  return { deposit, claimReward, claimDividend, compound, withdraw, amountStaked, apr, totalStaked, pendingRewards, pendingDividend };
}

export default useStakingPool;
