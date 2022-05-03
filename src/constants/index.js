import { pawswapRouterAbi } from './abis/pawswapRouter'
import { pancakeswapRouterAbi } from './abis/pancakeswapRouter'
import { pawswapFactoryAbi } from './abis/pawswapFactory'
import { pancakeswapFactoryAbi } from './abis/pancakeswapFactory'
import { ERC20Abi } from './abis/erc20'
import { taxStructureAbi } from './abis/taxStructure'
import { pawswapAbi } from './abis/pawswap'
import { pawsendAbi } from './abis/pawsend'
import { stakingPoolAbi } from './abis/stakingPool'

export const PAWTH_ADDRESS = {
  '0x1': '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f', // eth mainnet
  'eth': '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f',
  '0x38': '0x409e215738e31d8ab252016369c2dd9c2008fee0', // bsc mainnet
  'bsc': '0x409e215738e31d8ab252016369c2dd9c2008fee0',
  '0x4': '0x459BC05bF203cEd24E76c598B507aEAa9eD36C28', // rinkeby testnet
  '0x61': '0x3ddA03cA78286fF415E8428BA9E75f6472351E7D', // bsc testnet
  'bsctest': '0x3ddA03cA78286fF415E8428BA9E75f6472351E7D',
}

export const SHIBA_LP_ADDRESS = '0xc57dc778a0d2d150d04fc0fd09a0113ebe9d600c'

export const UNI_LP_ADDRESS = '0x800a45f2b861229d59e952aef57b22e84ff949a1'

export const COINGECKO_ID = 'pawthereum'

export const SNAPSHOT_URL = 'pawthereum.eth'

export const TOTAL_SUPPLY = 858000000

export const DISQUS_ID = 'mypawth'

export const DECIMALS = 9

export const DEFAULT_SLIPPAGE = 0.02

export const SLIPPAGE = {
  '0x1': 3,
  'eth': 3,
  '0x38':16,
  'bsc': 16,
  '0x61': 8,
  'bsctest': 8,
}

export const ERC20ABI = ERC20Abi
export const TAX_STRUCTURE_ABI = taxStructureAbi

export const PAWSEND = {
  '0x1': {
    abi: pawsendAbi,
    address: '',
  },
  'eth': {
    abi: pawsendAbi,
    address: '',
  },
  '0x38': {
    abi: pawsendAbi,
    address: '0x03bD989C8eB782B4a9f53407865F5A14790f95c4',
  },
  'bsc': {
    abi: pawsendAbi,
    address: '0x03bD989C8eB782B4a9f53407865F5A14790f95c4',
  },
  '0x61': {
    abi: pawsendAbi,
    address: '0x9B09f40f629B87292A72BAD5a351A876F8374DDa',
  },
  'bsctest': {
    abi: pawsendAbi,
    address: '0x9B09f40f629B87292A72BAD5a351A876F8374DDa',
  },
}

export const PAWSWAP = {
  '0x1': {
    abi: pawswapAbi,
    address: '',
  },
  'eth': {
    abi: pawswapAbi,
    address: '',
  },
  '0x38': {
    abi: pawswapAbi,
    address: '0xf62941e95ac43696276c9f1f3414ba62f9d76d37',
  },
  'bsc': {
    abi: pawswapAbi,
    address: '0xf62941e95ac43696276c9f1f3414ba62f9d76d37',
  },
  '0x61': {
    abi: pawswapAbi,
    address: '0xD50eC0688C6Bd8CE121d4bD50700a948d2AD2C2a',
  },
  'bsctest': {
    abi: pawswapAbi,
    address: '0xD50eC0688C6Bd8CE121d4bD50700a948d2AD2C2a',
  },
}

export const PAWSWAP_ROUTER = {
  '0x1': {
    abi: pawswapRouterAbi,
    address: '',
  },
  'eth': {
    abi: pawswapRouterAbi,
    address: '',
  },
  '0x38': {
    abi: pawswapRouterAbi,
    address: '',
  },
  'bsc': {
    abi: pawswapRouterAbi,
    address: '',
  },
  '0x61': {
    abi: pawswapRouterAbi,
    address: '0xef9d194f63218533203ba59909f518afeb156e9a',
  },
  'bsctest': {
    abi: pawswapRouterAbi,
    address: '0xef9d194f63218533203ba59909f518afeb156e9a',
  },
}

export const PAWSWAP_FACTORY = {
  '0x1': {
    abi: pawswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  'eth': {
    abi: pawswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  '0x38': {
    abi: pawswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  'bsc': {
    abi: pawswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  '0x61': {
    abi: pawswapFactoryAbi,
    address: '0x80ae086385f76d68efcdd5ecb7937ae32404ac41',
    initCodeHash: '0x496c5e6d63efe6a77455ad3cf0c1649757cd659e0669628f88886aa7d6829838',
  },
  'bsctest': {
    abi: pawswapFactoryAbi,
    address: '0x80ae086385f76d68efcdd5ecb7937ae32404ac41',
    initCodeHash: '0x496c5e6d63efe6a77455ad3cf0c1649757cd659e0669628f88886aa7d6829838',
  },
}

export const PANCAKESWAP_FACTORY = {
  '0x1': {
    abi: pancakeswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  'eth': {
    abi: pancakeswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  '0x38': {
    abi: pancakeswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  'bsc': {
    abi: pancakeswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  '0x61': {
    abi: pancakeswapFactoryAbi,
    address: '0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc',
    initCodeHash: '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074',
  },
  'bsctest': {
    abi: pancakeswapFactoryAbi,
    address: '0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc',
    initCodeHash: '0xecba335299a6693cb2ebc4782e74669b84290b6378ea3a3873c7231a8d7d1074',
  },
}

export const PANCAKESWAP_ROUTER = {
  '0x1': {
    abi: pancakeswapRouterAbi,
    address: '',
  },
  'eth': {
    abi: pancakeswapRouterAbi,
    address: '',
  },
  '0x38': {
    abi: pancakeswapRouterAbi,
    address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  },
  'bsc': {
    abi: pancakeswapRouterAbi,
    address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  },
  '0x61': {
    abi: pancakeswapRouterAbi,
    address: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  },
  'bsctest': {
    abi: pancakeswapRouterAbi,
    address: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  },
}

export const STAKING_POOL = {
  '0x61': {
    abi: stakingPoolAbi,
    address: '0xaD04172eF81f05095F677B9Dd4cB3b58D2ac6D8e'
  },
  'bsctest': {
    abi: stakingPoolAbi,
    address: '0xaD04172eF81f05095F677B9Dd4cB3b58D2ac6D8e'
  }
}

export const COLORS = {
  primary: '#ff65b3'
}