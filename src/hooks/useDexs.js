import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'
import { PAWSWAP_FACTORY, PAWSWAP_ROUTER, PANCAKESWAP_ROUTER, PANCAKESWAP_FACTORY } from '../constants'

const useDexs = () => {
  const { chainId } = useMoralis()
  const [dexs, setDexs] = useState({})

  useEffect(() => {
    if (!chainId) return 
    setDexs({
      pawswap: {
        name: 'Pawswap',
        router: {
          abi: PAWSWAP_ROUTER[chainId]?.abi,
          address: PAWSWAP_ROUTER[chainId]?.address
        },
        factory: {
          abi: PAWSWAP_FACTORY[chainId]?.abi,
          address: PAWSWAP_FACTORY[chainId]?.address,
          initCodeHash: PAWSWAP_FACTORY[chainId]?.initCodeHash
        }
      },
      pancakeswap: {
        name: 'Pancakeswap',
        router: {
          abi: PANCAKESWAP_ROUTER[chainId]?.abi,
          address: PANCAKESWAP_ROUTER[chainId]?.address
        },
        factory: {
          abi: PANCAKESWAP_FACTORY[chainId]?.abi,
          address: PANCAKESWAP_FACTORY[chainId]?.address,
          initCodeHash: PANCAKESWAP_FACTORY[chainId]?.initCodeHash
        }
      }
    })
  }, [chainId])

  const getDexByRouterAddress = (routerAddress) => {
    console.log('dexs', dexs)
    console.log({ routerAddress })
    console.log('pawswap', PAWSWAP_ROUTER[chainId]?.address)
    const options = Object.keys(dexs)
    console.log({ options })
    const dexName = options.find(o => dexs[o]?.router?.address === routerAddress)
    console.log('got it ', dexName)
    return dexs[dexName]
  }

  return {
    dexs,
    getDexByRouterAddress
  }
}

export default useDexs;