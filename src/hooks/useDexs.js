import { useMoralis } from 'react-moralis'
import { PAWSWAP_FACTORY, PAWSWAP_ROUTER, PANCAKESWAP_ROUTER, PANCAKESWAP_FACTORY } from '../constants'

const useDexs = () => {
  const { chainId } = useMoralis()

  const dexs = {
    pawswap: {
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
  }

  return {
    dexs
  }
}

export default useDexs;