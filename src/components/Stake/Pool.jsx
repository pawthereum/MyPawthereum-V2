import { useEffect, useState, useContext } from 'react'
import AppContext from 'AppContext'
import { useMoralis, useERC20Balances } from 'react-moralis'
import { Statistic, Divider, Row, Col, Card, Tag } from 'antd'
import useStakingPool from 'hooks/useStakingPool'
import PoolDeposit from './components/PoolDeposit'
import PoolWithdraw from './components/PoolWithdraw'
import PoolClaimReward from './components/PoolClaimReward'
import PoolClaimDividend from './components/PoolClaimDividend'
import { PAWTH_ADDRESS, DECIMALS, ERC20ABI } from '../../constants'
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
}

function Pool() {
  const { currentBlock } = useContext(AppContext);
  const { account, chainId, Moralis, web3 } = useMoralis()
  const { pendingRewards, pendingDividend, amountStaked, apr, totalStaked } = useStakingPool()
  const { data: assets } = useERC20Balances();

  const [pawthBalance, setPawthBalance] = useState(null)
  const [pendingRewardsAnimation, setPendingRewardsAnimation] = useState(null)
  const [stakedAmount, setStakedAmount] = useState(null)

  useEffect(() => {
    setStakedAmount(amountStaked)
  }, [amountStaked])

  useEffect(() => {
    if (!chainId) return
    const pawthAddress = PAWTH_ADDRESS[chainId]
    const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : []
    const pawthBalanceRaw = pawth ? pawth.balance : '0'
    const pawthBalanceFormatted = Moralis.Units.FromWei(pawthBalanceRaw, DECIMALS)
    setPawthBalance(pawthBalanceFormatted)
  }, [assets]) 

  useEffect(() => {
    setPendingRewardsAnimation({
      Children: { 
        value: Number(pendingRewards), 
        floatLength: 0,
        formatMoney: true,
      }, 
      duration: 1000,
    })
  }, [pendingRewards])

  useEffect(() => {
    if (!account || !currentBlock) return
    updatePawthBalance()

    async function updatePawthBalance() {
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
  }, [currentBlock, account])


  return (
    <Card 
      style={styles.card} 
      title='Staking Pool'
      extra={
        <div>
          <Tag>Total Staked {totalStaked}</Tag>
          <Tag>APR {apr}%</Tag>
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
            value={stakedAmount} 
            precision={0} 
            loading={stakedAmount == null} 
          />
        </Col>
      </Row>
      <Divider orientation="center">Earned $PAWTH</Divider>
      <Row>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '5px' }}>Rewards to Compound or Claim:</span>
          <TweenOne animation={pendingRewardsAnimation}>
            {pendingRewards}
          </TweenOne>
        </Col>  
      </Row>
      <PoolClaimReward isClaimDisabled={pendingRewards === '0'} />
      <Divider orientation="center">Reflected $PAWTH</Divider>
      <Row>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '5px' }}>Reflections to Compound or Claim:</span>
          <TweenOne animation={{
            Children: { 
              value: Number(pendingDividend), 
              floatLength: 0,
              formatMoney: true,
            }, 
            duration: 1000,
          }}>
            {pendingDividend}
          </TweenOne>
        </Col>
      </Row>
      <PoolClaimDividend isClaimDisabled={pendingDividend === '0'} />
      <Divider orientation="center">Deposit</Divider>
      <PoolDeposit />
      <Divider orientation="center">Withdraw</Divider>
      <PoolWithdraw />
    </Card>
  );
}

export default Pool;