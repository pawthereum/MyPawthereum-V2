import { useEffect, useState } from 'react'
import { useMoralis, useERC20Balances } from 'react-moralis'
import { Statistic, Divider, Row, Col, Card, Tag } from 'antd'
import useStakingPool from 'hooks/useStakingPool'
import PoolDeposit from './components/PoolDeposit'
import PoolWithdraw from './components/PoolWithdraw'
import PoolClaim from './components/PoolClaim'
import { PAWTH_ADDRESS, DECIMALS, ERC20ABI } from '../../constants'

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
}

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

function Pool() {
  const { account, chainId, Moralis, web3 } = useMoralis()
  const { viewPendingReward, viewAmountStaked, getApy, getTotalStaked } = useStakingPool()
  const { data: assets } = useERC20Balances();

  const [pendingRewards, setPendingRewards] = useState(null)
  const [currentBlock, setCurrentBlock] = useState(null)
  const [amountStaked, setAmountStaked] = useState(null)
  const [pawthBalance, setPawthBalance] = useState(null)
  const [apy, setApy] = useState(null)
  const [totalStaked, setTotalStaked] = useState(null)

  useEffect(() => {
    if (!chainId) return
    const pawthAddress = PAWTH_ADDRESS[chainId]
    const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : []
    const pawthBalanceRaw = pawth ? pawth.balance : '0'
    const pawthBalanceFormatted = Moralis.Units.FromWei(pawthBalanceRaw, DECIMALS)
    setPawthBalance(pawthBalanceFormatted)
  }, [assets]) 

  useEffect(() => {
    if (!account || !chainId) return 
    const web3Provider = Moralis.web3Library.getDefaultProvider()
    web3Provider.on('block', async blockNumber => {
      if (!chainId || !account) return
      setCurrentBlock(blockNumber)
    })
  }, [account, chainId])

  useEffect(() => {
    refreshAwards()
    async function refreshAwards() {
      const requests = await Promise.all([
        viewPendingReward(),
        viewAmountStaked(),
        getApy(),
        getTotalStaked()
      ])
      const refreshedRewards = requests[0]
      const amountStaked = requests[1]
      const apy = requests[2]
      const totalStaked = requests[3]
      if (refreshedRewards) {
        setPendingRewards(parseFloat(refreshedRewards).toLocaleString([], {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }))
      }
      if (apy) {
        setApy(apy.toLocaleString([], {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0
        }))
      }
      if (totalStaked) {
        setTotalStaked(roundBig(parseInt(totalStaked)))
      }
      setAmountStaked(amountStaked)
      try {
        const web3Provider = Moralis.web3Library
        const tokenContract = new web3Provider.Contract(
          PAWTH_ADDRESS[chainId],
          ERC20ABI,
          web3.getSigner()
        )
        const balance = await tokenContract.balanceOf(account)
        const balanceFormatted = Moralis.Units.FromWei(balance, DECIMALS)
        setPawthBalance(balanceFormatted)
      } catch (e) {
        console.log('error getting balance', e)
      }
    }
  }, [currentBlock])

  return (
    <Card 
      style={styles.card} 
      title='Staking Pool'
      extra={
        <div>
          <Tag>Total Staked {totalStaked}</Tag>
          <Tag>APY {apy}%</Tag>
        </div>
      }>
      <Row>
        <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Statistic 
            title="Pawth Balance" 
            value={pawthBalance} 
            precision={0}
            loading={pawthBalance == null} 
          />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Statistic 
            title="Amount Staked"
            value={amountStaked} 
            precision={0} 
            loading={amountStaked == null} 
          />
        </Col>
      </Row>
      <Divider orientation="center">Claim</Divider>
      <Row>
        <Col>
          Rewards to Compound or Claim: {pendingRewards || 'Loading...'}
        </Col>  
      </Row>
      <PoolClaim isClaimDisabled={pendingRewards === '0'} />
      <Divider orientation="center">Deposit</Divider>
      <PoolDeposit />
      <Divider orientation="center">Withdraw</Divider>
      <PoolWithdraw />
    </Card>
  );
}

export default Pool;