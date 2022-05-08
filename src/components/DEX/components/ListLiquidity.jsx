import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis';
import { Row, Col, Input } from 'antd';
import { useERC20Balance } from 'hooks/useERC20Balance';
import useLiquidity from 'hooks/useLiquidity';
import useNative from 'hooks/useNative';
import Web3 from "web3"; 
import { TokenAmount, Percent } from '@uniswap/sdk'

function ListLiquidity () {
  const { Moralis } = useMoralis()
  const { getPawswapPair, getPairReserves, getPairTotalSupply } = useLiquidity()
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

  const sortTokens = (tokenList) => {
    return tokenList.sort((a, b) => 
      web3Provider.utils.getAddress(a.address) > 
      web3Provider.utils.getAddress(b.address) 
      ? 1 : -1
    )
  }

  const getLpTokenData = async (lpToken, tokenAddress) => {
    console.log({ lpToken })
    const web3Provider = Moralis.web3Library;
    const BigNumber = web3Provider.BigNumber

    const pairData = await Promise.all([
      getPairReserves(lpToken?.token_address),
      getPairTotalSupply(lpToken?.token_address),
    ])
    const sortedTokens = sortTokens([tokenAddress, wrapped])
    const reserves = pairData[0]
    const totalSupply = pairData[1]
    const shareOfSupply = new Percent(
      BigNumber.from(lpToken?.balance),
      totalSupply
    )
    const token0AmountInLpShare = reserves[0].mul(shareOfSupply)
    const token1AmountInLpShare = reserves[0].mul(shareOfSupply)
    console.log({ 
      pairData, 
      shareOfSupply: shareOfSupply.toSignificant(2),
      token0AmountInLpShare: token0AmountInLpShare.toSignificant(6),
      token1AmountInLpShare: token1AmountInLpShare.toSignificant(6),
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
      const lpToken = assets.find(a => a.token_address.toLowerCase() === lpTokenAddress.toLowerCase())
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


  return (
    <div>
      <Row style={{ marginTop: '2rem' }}>
        <Col>
          Your Liquidity
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span>Insert LP Token</span>
          <Search 
            size="large"
            placeholder="Token Address" 
            onSearch={onSearch} 
            onChange={tryAutoSearch}
            style={{ width: '100%' }} 
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          { lpToken?.symbol }
          { formatBalanceFromWei(lpToken?.balance, lpToken) }
        </Col>
      </Row>
    </div>
  )
}

export default ListLiquidity;