import { useState, useEffect } from 'react'
import { Slider, Statistic, Card, Row, Col, Space, Button } from 'antd'
import { PAWSWAP_ROUTER } from '../../../constants'
import useAllowances from 'hooks/useAllowances'
import useLiquidity from 'hooks/useLiquidity'
import useNative from 'hooks/useNative'
import { TokenAmount, Percent } from '@uniswap/sdk'
import { useMoralis } from 'react-moralis'

const styles = {
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  },
  card: {
    borderRadius: "24px",
    width: '100%'
  },
  cardRow: {
    display: 'flex', 
    justifyContent: 'space-between', 
    width: '100%'
  }
}

function RemoveLiquidity(props) {
  const { lpTokenData } = props
  const {
    tokenInPairing,
    tokenReservesAmount,
    wethReservesAmount,
    tokenAmountInLpShare,
    wethAmountInLpShare,
    totalSupply,
    shareOfSupply,
    lpToken,
    lpTokenBalance
  } = lpTokenData
  const { chainId } = useMoralis()
  const { getWrappedNativeToken } = useNative()
  const { hasAllowance, updateAllowance } = useAllowances()
  const { getPairTotalSupply, removeLiquidity } = useLiquidity()
  const [percentage, setPercentage] = useState(0)
  const [approvalIsLoading, setApprovalIsLoading] = useState(false)
  const [approvalText, setApprovalText] = useState('Approve')
  const [showApproveBtn, setShowApproveBtn] = useState(false)
  const [tokenAmountReceivedInRemoval, setTokenAmountReceivedInRemoval] = useState(null)
  const [wethAmountReceivedInRemoval, setWethAmountReceivedInRemoval] = useState(null)
  const [lpTokenAmountToRemove, setlpTokenAmountToRemove] = useState(null)

  const onPercentageChange = value => {
    setPercentage(value)
  }

  useEffect(() => {
    const percent = new Percent(percentage, 100)
    setTokenAmountReceivedInRemoval(
      new TokenAmount(tokenInPairing, percent.multiply(
        tokenAmountInLpShare.raw
      ).quotient)
    )
    setWethAmountReceivedInRemoval(
      new TokenAmount(getWrappedNativeToken(), percent.multiply(
        wethAmountInLpShare.raw
      ).quotient)
    )
    const amtToRemove = new TokenAmount(lpToken, percent.multiply(
      lpTokenBalance.raw
    ).quotient)
    setlpTokenAmountToRemove(amtToRemove)

    if (amtToRemove.greaterThan(0)) {
      checkAllowance()
    }

    async function checkAllowance () {
      const sufficientAllowance = await hasAllowance({
        amount: lpTokenAmountToRemove.toSignificant(tokenInPairing?.decimals),
        token: tokenInPairing,
        spender: PAWSWAP_ROUTER[chainId]?.address
      })
      setShowApproveBtn(!sufficientAllowance)
    }

  }, [percentage])

  const tryRemoveLiquidity = async () => {
    try {
      await removeLiquidity({
        token: tokenInPairing,
        amountToRemove: lpTokenAmountToRemove
      })
    } catch (e) {
      console.log({e})
    }
  }

  const approveRemovalAmount = async () => {
    setApprovalIsLoading(true)
    setApprovalText('Approving')

    await updateAllowance({
      amount: lpTokenAmountToRemove,
      spender: PAWSWAP_ROUTER[chainId]?.address,
      token: lpToken
    })

    setApprovalIsLoading(false)
    setShowApproveBtn(false)
    setApprovalText('Approve')

    return true
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Statistic title="Amount" value={percentage} suffix="%" precision={0} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Slider
            min={0}
            max={100}
            onChange={onPercentageChange}
            tipFormatter={v => v + '%'}
            value={typeof percentage === 'number' ? percentage : 0}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[25, 50, 75, 100].map(p => {
            return (
              <Button key={p} type={percentage === p ? 'primary' : ''} shape="round" size="large" onClick={() => setPercentage(p)}>
                {p}%
              </Button>
            )
          })}          
        </Col>
      </Row>
      <Row gutter={6}>
        {
          !showApproveBtn ? '' :
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "0.6rem",
                height: "50px",
                ...styles.outset,
              }}
              onClick={() => approveRemovalAmount()}
              loading={approvalIsLoading}
            >
              {approvalText}
            </Button>
          </Col>
        }
        <Col span={showApproveBtn ? 12 : 24}>
          <Button
            type="primary"
            size="large"
            disabled={showApproveBtn}
            style={{
              width: "100%",
              borderRadius: "0.6rem",
              height: "50px",
              ...styles.outset,
            }}
            onClick={() => tryRemoveLiquidity()}
          >
            Remove Liquidity
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card style={styles.card}>
            <Row style={styles.cardRow}>
              <Col>Token Received</Col>
              <Col>{tokenAmountReceivedInRemoval?.toSignificant(9)}</Col>
            </Row>
            <Row style={styles.cardRow}>
              <Col>{getWrappedNativeToken().symbol} Received</Col>
              <Col>{wethAmountReceivedInRemoval?.toSignificant(9)}</Col>
            </Row>
            <Row style={styles.cardRow}>
              <Col>LP Token Removed</Col>
              <Col>{lpTokenAmountToRemove?.toSignificant(9)}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

export default RemoveLiquidity;