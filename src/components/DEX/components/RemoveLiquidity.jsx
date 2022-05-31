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
  const [removeLiquidityIsLoading, setRemoveLiquidityIsLoading] = useState(false)
  const [removeLiquidityText, setRemoveLiquidityText] = useState('Remove Liquidity')
  const [tokenAmountReceivedInRemoval, setTokenAmountReceivedInRemoval] = useState(null)
  const [wethAmountReceivedInRemoval, setWethAmountReceivedInRemoval] = useState(null)
  const [lpTokenAmountToRemove, setlpTokenAmountToRemove] = useState(null)

  const onPercentageChange = value => {
    setPercentage(value)
  }

  useEffect(() => {
    const percent = new Percent(percentage, 100)
    const amtToSub =  new TokenAmount(tokenInPairing, percent.multiply(
      tokenAmountInLpShare.raw
    ).quotient)
    console.log('actual amt', tokenAmountInLpShare.subtract(amtToSub))
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

    console.log({ lpToken, tokenInPairing })

    async function checkAllowance () {
      const sufficientAllowance = await hasAllowance({
        amount: amtToRemove,
        token: lpToken,
        spender: PAWSWAP_ROUTER[chainId]?.address
      })
      console.log({ sufficientAllowance })
      setShowApproveBtn(!sufficientAllowance)
    }

  }, [percentage])

  const tryRemoveLiquidity = async () => {
    setRemoveLiquidityIsLoading(true)
    setRemoveLiquidityText('Removing Liquidity')
    try {
      await removeLiquidity({
        token: tokenInPairing,
        amountToRemove: lpTokenAmountToRemove
      })
    } catch (e) {
      console.log({e})
    }
    setRemoveLiquidityIsLoading(false)
    setRemoveLiquidityText('Remove Liquidity')
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

  const formatNumber = (number) => {
    return Number(number).toLocaleString([], {
      maximumFractionDigits: 18,
      minimumFractionDigits: 0
    })
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
      <Row gutter={6} style={{ display: 'flex', alignItems: 'center' }}>
        {
          !showApproveBtn ? '' :
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
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
            loading={removeLiquidityIsLoading}
            onClick={() => tryRemoveLiquidity()}
          >
            {removeLiquidityText}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card style={styles.card}>
            <Row style={styles.cardRow}>
              <Col>Token Received</Col>
              <Col>{formatNumber(tokenAmountReceivedInRemoval?.toSignificant(9))}</Col>
            </Row>
            <Row style={styles.cardRow}>
              <Col>{getWrappedNativeToken().symbol} Received</Col>
              <Col>{formatNumber(wethAmountReceivedInRemoval?.toSignificant(9))}</Col>
            </Row>
            <Row style={styles.cardRow}>
              <Col>LP Token Removed</Col>
              <Col>{formatNumber(lpTokenAmountToRemove?.toSignificant(9))}</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

export default RemoveLiquidity;