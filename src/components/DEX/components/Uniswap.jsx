import { COLORS, PAWTH_ADDRESS, DECIMALS } from '../../../constants'
import { SwapWidget } from '@uniswap/widgets/dist/index.js'
import { useMoralis } from 'react-moralis'
// import '@uniswap/widgets/dist/fonts.css'
import "../../../index.css"
import { Skeleton } from 'antd'
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider)
const jsonRpcEndpoint = 'https://speedy-nodes-nyc.moralis.io/7aae1dddeb9f38dc59c7ce3f/eth/mainnet'

const theme = {
  fontFamily: 'Comfortaa',
  accent: COLORS.primary,
}

function Uniswap() {
  const { chainId } = useMoralis()
  console.log(parseInt(chainId, 16))

  const CUSTOM_TOKEN_LIST = [
    {
      "name": "Pawthereum",
      "address": PAWTH_ADDRESS[chainId],
      "symbol": "PAWTH",
      "decimals": DECIMALS,
      "chainId": parseInt(chainId, 16),
      "logoURI": "https://assets.coingecko.com/coins/images/19275/large/pawth.png?1635127429"
    },
  ]

  if (!chainId) return ( <Skeleton></Skeleton> )

  if (chainId !== '0x1' && chainId !== '0x4') return (
    <div>
      Switch to the Ethereum network to use a Uniswap interface
    </div>
  )

  return (
    <div >
      <SwapWidget
        provider={web3.givenProvider}
        jsonRpcEndpoint={jsonRpcEndpoint}
        theme={theme}
        tokenList={CUSTOM_TOKEN_LIST}
        defaultInputTokenAddress={'NATIVE'}
        defaultOutputTokenAddress={PAWTH_ADDRESS[chainId]}
      />
    </div>
  )
}

export default Uniswap;