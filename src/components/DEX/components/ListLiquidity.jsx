import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis';
import { Button, Card, Row, Col, Input } from 'antd';
import { useERC20Balance } from 'hooks/useERC20Balance';
import useLiquidity from 'hooks/useLiquidity';
import useNative from 'hooks/useNative';
import Web3 from "web3"; 
import { Fetcher, TokenAmount, Percent, Token } from '@uniswap/sdk'
import { networkConfigs } from 'helpers/networks';

function ListLiquidity () {
  const { Moralis, chainId, web3 } = useMoralis()
  const { 
    getPawswapPair, 
    getPairReserves, 
    getPairTotalSupply, 
    updateLpTokenRemovalData,
    updateShowRemoveLiquidity
  } = useLiquidity()
  const { assets } = useERC20Balance()
  const { getWrappedNativeToken, wrappedAddress } = useNative()

  const { Search } = Input

  const [pawLpTokens, setPawLpTokens] = useState([])
  const [lpToken, setLpToken] = useState(null)

  const formatBalanceFromWei = (wei, token) => {
    if (!wei || !token) return null
    return Number(Moralis.Units.FromWei(wei, token?.decimals)).toLocaleString([], {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    })
  }

  const getLpTokenData = async (lpToken, tokenAddress) => {
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    const token = await Fetcher.fetchTokenData(chainId, tokenAddress, web3.getSigner());
    const weth = getWrappedNativeToken()

    const pairData = await Promise.all([
      getPairReserves(lpToken?.token_address),
      getPairTotalSupply(lpToken?.token_address),
    ])
    const reserves = pairData[0]
    const totalSupply = pairData[1]
    
    //TODO: this is for testing only, remove this
    lpToken.balance = totalSupply

    const shareOfSupply = new Percent(
      BigNumber.from(lpToken?.balance),
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

    updateLpTokenRemovalData({
      tokenReservesAmount,
      wethReservesAmount,
      tokenAmountInLpShare,
      wethAmountInLpShare,
      totalSupply,
      shareOfSupply
    })
  }

  const onSearch = value => console.log('value of search', value);
  const tryAutoSearch = async (e) => {
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
      const lpToken = chainId === '0x539'
        ? { balance: '0', token_address: lpTokenAddress, decimals: 18, symbol: 'Paw-LP', name: 'Pawswap LP Token' }
        : assets.find(a => a.token_address.toLowerCase() === lpTokenAddress.toLowerCase())
      setLpToken(lpToken)
      getLpTokenData(lpToken, checkSummedAddress)
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    if (!assets) return
    const pawswapLpTokens = assets.filter(a => a.symbol === 'Paw-LP')
    setPawLpTokens(pawswapLpTokens)
  }, [assets])

  const goToRemoveLiquidity = () => {
    console.log('showing remove liq...')
    updateShowRemoveLiquidity(true)
  }


  return (
    <div>
      <Row style={{ marginTop: '2rem' }}>
        <Col>
          Your Liquidity
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Search 
            size="large"
            placeholder={`Token Paired with ${networkConfigs[chainId].currencySymbol}`}
            onSearch={tryAutoSearch} 
            onChange={tryAutoSearch}
            style={{ width: '100%' }} 
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ marginTop: '10px' }}>
          {
            !lpToken ? '' :
            <Card styles={{ borderRadius: '1rem', padding: '5px' }}>
              { lpToken?.symbol }
              { formatBalanceFromWei(lpToken?.balance, lpToken) }
              <Button onClick={() => goToRemoveLiquidity() }>
                Remove Liquidity
              </Button>
            </Card>
          }
        </Col>
      </Row>
    </div>
  )
}

export default ListLiquidity;