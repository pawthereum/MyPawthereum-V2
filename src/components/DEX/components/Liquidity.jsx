import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import {Button, Input, Row, Col, Card, Collapse, Skeleton } from 'antd';
import { useERC20Balance } from 'hooks/useERC20Balance';
import Web3 from "web3"; 
import useNative from 'hooks/useNative';
import { Fetcher, TokenAmount, Percent, Token } from '@uniswap/sdk'
import { networkConfigs } from 'helpers/networks';
import Settings from './Settings';
import AddLiquidity from './AddLiquidity';
import { ArrowLeftOutlined } from '@ant-design/icons';
import RemoveLiquidity from './RemoveLiquidity';
import useLiquidity from 'hooks/useLiquidity';
import { COLORS } from '../../../constants'

const { Panel } = Collapse;

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  },
  lpTokenDataCard: {
    backgroundColor: COLORS.defaultBg,
    border: "1px solid #e7eaf3",
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
    borderRadius: "1rem",
    width: "100%",
  },
  lpTokenCardRow: {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'space-between'
  }
}

function Liquidity () {  
  const { Moralis, chainId, web3 } = useMoralis()
  const { 
    getPawswapPair, 
    getPairReserves, 
    getPairTotalSupply, 
    updateLpTokenRemovalData,
    lpTokenRemovalData,
    getPairTokenAddresses
  } = useLiquidity()
  const { assets } = useERC20Balance()
  const { getWrappedNativeToken, wrappedAddress, isNative } = useNative()

  const { Search } = Input

  const [removeLiquidityIsVisible, setRemoveLiquidityIsVisible] = useState(false)
  const [addLiquidityIsVisible, setAddLiquidityIsVisible] = useState(false)
  const [pawLpTokens, setPawLpTokens] = useState(null)
  const [lpToken, setLpToken] = useState(null)
  const [lpTokenData, setLpTokenData] = useState(null)

  const formatBalanceFromWei = (wei, token) => {
    if (!wei || !token) return null
    return Number(Moralis.Units.FromWei(wei, token?.decimals)).toLocaleString([], {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    })
  }

  const createTokensFromPairedTokens = async (tokensInPair) => {
    // const tokensInPair = await getPairTokenAddresses(token.token_address)
    const token0Asset = assets.find(a => a.token_address === tokensInPair[0].toLowerCase())
    const token0 = !token0Asset ? null 
      : new Token(
          chainId, 
          token0Asset.token_address, 
          token0Asset.decimals, 
          token0Asset.symbol, 
          token0Asset.name
        )
    const token1Asset = assets.find(a => a.token_address === tokensInPair[1].toLowerCase())
    const token1 = !token0Asset ? null 
      : new Token(
          chainId, 
          token1Asset.token_address, 
          token1Asset.decimals, 
          token1Asset.symbol, 
          token1Asset.name
        )
    return [token0, token1]
  }

  const getLpTokenData = async (lpToken, lpTokenBalance, tokenAddress) => {
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    const token = await Fetcher.fetchTokenData(chainId, tokenAddress, web3.getSigner());
    const weth = getWrappedNativeToken()

    const pairData = await Promise.all([
      getPairReserves(lpToken?.address),
      getPairTotalSupply(lpToken?.address),
      getPairTokenAddresses(lpToken?.address)
    ])
    const reserves = pairData[0]
    const totalSupply = pairData[1]
    const tokensInPair = await createTokensFromPairedTokens(pairData[2])
    
    //TODO: this is for testing only, remove this
    lpTokenBalance = totalSupply

    const shareOfSupply = new Percent(
      BigNumber.from(lpTokenBalance),
      totalSupply
    )
    console.log({ totalSupply})

    // figure out which reserve is token and which is weth
    const tokenReserves = token?.address > weth?.address ? reserves[1] : reserves[0]
    const wethReserves = token?.address > weth?.address ? reserves[0] : reserves[1]

    // make a token amount class for each
    const tokenReservesAmount = new TokenAmount(token, tokenReserves)
    const wethReservesAmount = new TokenAmount(weth, wethReserves)

    // user's amount based on their LP token balance
    const tokenAmountInLpShare = new TokenAmount(token, shareOfSupply.multiply(
      tokenReservesAmount.raw
    ).quotient)
    const wethAmountInLpShare = new TokenAmount(weth, shareOfSupply.multiply(
      wethReservesAmount.raw
    ).quotient)

    console.log(new TokenAmount(lpToken, lpTokenBalance))
    console.log(new TokenAmount(lpToken, lpTokenBalance).toSignificant(18))

    return {
      lpToken,
      lpTokenBalance: new TokenAmount(lpToken, lpTokenBalance),
      tokenInPairing: token,
      tokenReservesAmount,
      wethReservesAmount,
      tokenAmountInLpShare,
      wethAmountInLpShare,
      totalSupply,
      shareOfSupply,
      tokensInPair
    }
  }

  const tryAutoSearch = async (e) => {
    if (!e || !e.target || !e.target.value) return
    const MIN_ADDR_LENGTH = 42
    if (e.target.value.trim().length !== MIN_ADDR_LENGTH) return
    const web3Provider = Moralis.web3Library
    const web3js = new Web3(Moralis.provider)
    try {
      const checkSummedAddress = web3js.utils.toChecksumAddress(e.target.value)
      const isAddress = web3Provider.utils.isAddress(checkSummedAddress)
      console.log({ isAddress })
      if (!isAddress) return
      const lpTokenAddress = await getPawswapPair(checkSummedAddress)
      let lpToken = chainId === '0x539'
        ? { balance: '0', token_address: lpTokenAddress, decimals: 18, symbol: 'Paw-LP', name: 'Pawswap LP Token' }
        : assets.find(a => a.token_address.toLowerCase() === lpTokenAddress.toLowerCase())
      const balance = lpToken.balance
      lpToken = new Token(
        chainId,
        lpToken.token_address,
        18,
        'Paw-LP',
        'Pawswap LP Token'
      )
      setLpToken(lpToken)
      const lpTokenData = await getLpTokenData(lpToken, balance, checkSummedAddress)
      setLpTokenData(lpTokenData)
      // getLpTokenData(lpToken, balance, checkSummedAddress)
    } catch (e) {
      console.log('error', e)
    }
  }

  const getInfoForPawLpTokens = async (tokens) => {
    const web3js = new Web3(Moralis.provider)
    const lpTokens = await Promise.all(tokens.map(async token => {
      const tokenData = await getLpTokenData(
        new Token(chainId, token.token_address, token.decimals, token.symbol, token.name),
        token.balance,
        web3js.utils.toChecksumAddress(token.token_address)
      )
      return tokenData
    }))
    console.log({ lpTokens })
    setPawLpTokens(lpTokens)
  }

  useEffect(() => {
    if (!assets) return
    // only take 5 to go easy on the api
    // TODO: make a load more button for these
    const pawswapLpTokensInWallet = assets.filter(a => a.symbol === 'Paw-LP').slice(0, 5)
    getInfoForPawLpTokens(pawswapLpTokensInWallet)
  }, [assets])

  const showAddLiquidity = () => {
    console.log('showing...')
    setAddLiquidityIsVisible(true)
  }

  const hideAddLiquidity = () => {
    console.log('hiding...')
    setAddLiquidityIsVisible(false)
  }

  const showRemoveLiquidity = () => {
    console.log('showing...')
    setRemoveLiquidityIsVisible(true)
  }

  const hideRemoveLiquidity = () => {
    console.log('hiding...')
    setRemoveLiquidityIsVisible(false)
  }

  const LpTokenCard = ({ data }) => (
    <Card style={styles.lpTokenDataCard}>
      <Row style={styles.lpTokenCardRow}>
        <Col>Your Pool Share</Col>
        <Col>{data?.shareOfSupply?.toSignificant()}%</Col>
      </Row>
      <Row style={styles.lpTokenCardRow}>
        <Col>Pooled {data?.tokensInPair[0].symbol}</Col>
        <Col>{
          isNative(data?.tokensInPair[0]?.address)
            ? data?.wethReservesAmount?.toSignificant(9)
            : data?.tokenReservesAmount?.toSignificant(9)
        }</Col>
      </Row>
      <Row style={styles.lpTokenCardRow}>
        <Col>Pooled {data?.tokensInPair[1].symbol}</Col>
        <Col>{
          isNative(data?.tokensInPair[1]?.address)
            ? data?.wethReservesAmount?.toSignificant(9)
            : data?.tokenReservesAmount?.toSignificant(9)
        }</Col>
      </Row>
      <Row style={styles.lpTokenCardRow}>
        <Col>Your {data?.tokensInPair[0].symbol} Share</Col>
        <Col>{
          isNative(data?.tokensInPair[0]?.address)
            ? data?.wethAmountInLpShare?.toSignificant(9)
            : data?.tokenAmountInLpShare?.toSignificant(9)
        }</Col>
      </Row>
      <Row style={styles.lpTokenCardRow}>
        <Col>Your {data?.tokensInPair[1].symbol} Share</Col>
        <Col>{
          isNative(data?.tokensInPair[1]?.address)
            ? data?.wethAmountInLpShare?.toSignificant(9)
            : data?.tokenAmountInLpShare?.toSignificant(9)
        }</Col>
      </Row>
      <Row style={{ ...styles.lpTokenCardRow, marginTop: '10px' }}>
        <Col>
        <Button type="primary" size="small" style={{ borderRadius: '4px', ...styles.outset }} onClick={() => {
            showAddLiquidity()
            hideRemoveLiquidity()
          }}>
            Add Liquidity
          </Button>   
        </Col>
        <Col>
          <Button type="primary" size="small" style={{ borderRadius: '4px', ...styles.outset }} onClick={() => {
            setLpTokenData(data)
            showRemoveLiquidity()
            hideAddLiquidity()
          }}>
            Remove Liquidity
          </Button>       
        </Col>
      </Row>
    </Card>
  )

  return (
    <Row>
      <Col>
        <Card style={styles.card} title={
          <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={!addLiquidityIsVisible && !removeLiquidityIsVisible ? 12  : 8 }>
              {
                !addLiquidityIsVisible && !removeLiquidityIsVisible ? `Liquidity` :
                <ArrowLeftOutlined style={{ cursor: 'pointer', marginRight: '0.5rem' }} onClick={() => {
                  hideAddLiquidity()
                  hideRemoveLiquidity()
                }} />
              }
            </Col>
            {
              !addLiquidityIsVisible ? '' :
              <Col span={8}>
                Add Liquidity
              </Col>
            }
            {
              !removeLiquidityIsVisible ? '' :
              <Col span={8}>
                Remove Liquidity
              </Col>
            }
            <Col span={!addLiquidityIsVisible && !removeLiquidityIsVisible ? 12  : 8 } style={{ display: 'flex', justifyContent: 'end' }}>
              <Settings />
            </Col>
          </Row>
        }>
          {
            !removeLiquidityIsVisible ? '' : 
            <RemoveLiquidity lpTokenData={lpTokenData} />
          }
          {
            !addLiquidityIsVisible
            ?
              <>
                <Row>
                  <Col span={24}>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        width: "100%",
                        borderRadius: "0.6rem",
                        height: "50px",
                        marginTop: "10px",
                        ...styles.outset,
                      }}
                      onClick={() => showAddLiquidity()}
                    >
                      Add Liquidity
                    </Button>
                  </Col>
                </Row>
              </>
            :
              <AddLiquidity />
          }
          {
            !addLiquidityIsVisible && !removeLiquidityIsVisible ?
            <>
              <Row style={{ marginTop: '2rem' }}>
                <Col>
                  Your Liquidity
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  { !pawLpTokens ? <Skeleton /> : '' }
                  <Collapse expandIconPosition="right" ghost>
                    { !pawLpTokens ? <></> : pawLpTokens.map((tokenData, i) => (
                        <Panel
                          defaultActiveKey={['1']} 
                          header={
                            <span>{tokenData.tokensInPair[0].symbol} / {tokenData.tokensInPair[1].symbol}</span>} 
                          key={i}
                        >
                          <LpTokenCard data={tokenData} />
                        </Panel>
                      ))
                    }
                  </Collapse>
                  <Search 
                    size="large"
                    placeholder={`Token Paired with ${networkConfigs[chainId].currencySymbol}`}
                    onSearch={tryAutoSearch} 
                    onChange={tryAutoSearch}
                    style={{ width: '100%' }} 
                  />
                </Col>
              </Row>
            </>
            : ''
          }
          <Row>
            <Col span={24} style={{ marginTop: '10px' }}>
              {
                !lpToken || !lpTokenData ? '' :
                <Card styles={{ borderRadius: '1rem', padding: '5px' }}>
                  <Row style={styles.lpTokenCardRow}>
                    <Col>{ lpToken?.symbol }</Col>
                    <Col>{ formatBalanceFromWei(lpToken?.balance, lpToken) }</Col>
                  </Row>
                  <Row style={styles.lpTokenCardRow}>
                    <Col>Your Token Share</Col><Col>{lpTokenData?.tokenAmountInLpShare.toSignificant(9)}</Col>
                  </Row>
                  <Row style={styles.lpTokenCardRow}>
                    <Col>Your {getWrappedNativeToken().symbol} Share</Col><Col>{lpTokenData?.wethAmountInLpShare.toSignificant(9)}</Col>
                  </Row>
                  {
                    !removeLiquidityIsVisible
                      ? 
                        <Button onClick={() => {
                          showRemoveLiquidity()
                          hideAddLiquidity()
                        }}>
                          Remove Liquidity
                        </Button>
                      : ''
                  }         
                </Card>
              }
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Liquidity;