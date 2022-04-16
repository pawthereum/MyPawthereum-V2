import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { Row, Col, Button, Input } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import useStakingPool from 'hooks/useStakingPool'

function PoolClaim () {
  const { account, chainId, Moralis } = useMoralis()
  const [isClaimLoading, setIsClaimLoading] = useState(false)
  const [isClaimDisabled, setIsClaimDisabled] = useState(false)
  const [pendingRewards, setPendingRewards] = useState(0)
  const [currentBlock, setCurrentBlock] = useState(null)
  const { claim, viewPendingReward } = useStakingPool()

  useEffect(() => {
    if (!account || !chainId) return 
    console.log('hooking up listener')
    const web3Provider = Moralis.web3Library.getDefaultProvider()
    web3Provider.on('block', async blockNumber => {
      if (!chainId || !account) return
      console.log('blockNumber', blockNumber)
      setCurrentBlock(blockNumber)
    })
  }, [account, chainId])

  useEffect(() => {
    console.log('current block is now', currentBlock)
    refreshAwards()
    async function refreshAwards() {
      const refreshedRewards = await viewPendingReward()
      console.log('pendingRewardReq', refreshedRewards)
      setPendingRewards(refreshedRewards)
    }
  }, [currentBlock])

  async function tryClaim () {
    if (pendingRewards === '0') return 
    setIsClaimLoading(true)
    const claimReq = await claim()
    console.log('claimReq', claimReq)
    setIsClaimLoading(false)
  }

  return (
    <div>
      <Row>
        <Col>
          Pending Rewards to Claim: {pendingRewards}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
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