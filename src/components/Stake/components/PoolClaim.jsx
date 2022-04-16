import { useMoralis, useERC20Balances } from 'react-moralis'
import { useEffect, useState } from 'react'
import { Row, Col, Button } from "antd";
import { PAWTH_ADDRESS, DECIMALS, ERC20ABI } from '../../../constants'
import useStakingPool from 'hooks/useStakingPool'

function PoolClaim () {
  const { account, chainId, Moralis, web3 } = useMoralis()
  const [isClaimLoading, setIsClaimLoading] = useState(false)
  const [isClaimDisabled, setIsClaimDisabled] = useState(false)
  const [isCompoundLoading, setIsCompoundLoading] = useState(false)
  const [pendingRewards, setPendingRewards] = useState(null)
  const [amountStaked, setAmountStaked] = useState(null)
  const [currentBlock, setCurrentBlock] = useState(null)
  const [pawthBalance, setPawthBalance] = useState(null)
  const { claim, compound, viewPendingReward, viewAmountStaked } = useStakingPool()
  const { data: assets } = useERC20Balances();

  useEffect(() => {
    if (!chainId) return
    const pawthAddress = PAWTH_ADDRESS[chainId]
    const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : []
    const pawthBalanceRaw = pawth ? pawth.balance : '0'
    const pawthBalanceFormatted = parseFloat(Moralis.Units.FromWei(
      pawthBalanceRaw, 
      DECIMALS
    )).toLocaleString([], {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    })
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
        viewAmountStaked()
      ])
      const refreshedRewards = requests[0]
      const amountStatked = requests[1]
      setPendingRewards(parseFloat(refreshedRewards).toLocaleString([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
      }))
      setAmountStaked(parseFloat(amountStatked).toLocaleString([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
      }))
      
      setIsClaimDisabled(refreshedRewards === '0')
    }
  }, [currentBlock])

  async function tryClaim () {
    if (pendingRewards === '0') return
    setIsClaimLoading(true)
    await claim()
    const web3Provider = Moralis.web3Library
    const tokenContract = new web3Provider.Contract(
      PAWTH_ADDRESS[chainId],
      ERC20ABI,
      web3.getSigner()
    )
    try {
      const balance = await tokenContract.balanceOf(account)
      const balanceFormatted = parseFloat(Moralis.Units.FromWei(
        balance,
        DECIMALS
      ).toLocaleString([], {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
      }))
      setPawthBalance(balanceFormatted)
    } catch (e) {
      console.log('error getting balance', e)
    }

    setIsClaimLoading(false)
  }

  async function tryCompound () {
    if (pendingRewards === '0') return
    setIsCompoundLoading(true)
    const claimReq = await compound()
    setIsCompoundLoading(false)
  }

  return (
    <div>
      <Row>
        <Col>
          Pending Rewards to Claim: {pendingRewards}
        </Col>  
      </Row>
      <Row>
        <Col>
          Amount Staked: {amountStaked}
        </Col>
      </Row>
      <Row>
        <Col>
          Pawth Balance: {pawthBalance}
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "0.6rem",
              height: "50px",
            }}
            onClick={() => tryCompound()}
            loading={isCompoundLoading}
            disabled={isClaimDisabled}
          >
            Compound 📚
          </Button>
        </Col> 
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            style={{
              width: "100%",
              marginTop: "15px",
              borderRadius: "0.6rem",
              height: "50px",
            }}
            onClick={() => tryClaim()}
            loading={isClaimLoading}
            disabled={isClaimDisabled}
          >
            Claim 🤑
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default PoolClaim;