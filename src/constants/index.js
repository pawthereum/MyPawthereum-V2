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
  '0x61': '0xe32Ba5D0755F996BB0c650aC7A7fBDEa0839d417', // bsc testnet
  'bsctest': '0xe32Ba5D0755F996BB0c650aC7A7fBDEa0839d417',
  'localdevchain': '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9',
  '0x539': '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9'
}

export const PAWTH_CHARITY_WALLET = {
  '0x1': '',
  'eth': '',
  '0x38': '',
  'bsc': '',
  '0x61': '',
  'bsctest': '',
  'localdevchain': '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0x539': '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f'
}

export const SHIBA_LP_ADDRESS = '0xc57dc778a0d2d150d04fc0fd09a0113ebe9d600c'

export const UNI_LP_ADDRESS = '0x800a45f2b861229d59e952aef57b22e84ff949a1'

export const COINGECKO_ID = 'pawthereum'

export const SNAPSHOT_URL = 'pawthereum.eth'

export const TOTAL_SUPPLY = 858000000

export const DISQUS_ID = 'mypawth'

export const DECIMALS = 9

export const DEFAULT_SLIPPAGE = 0.02

export const HIGH_PRICE_IMPACT = 5 // 5%
export const MAXMIMUM_PRICE_IMPACT = 15

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
    address: '0x80a7be23b0222768e8bd41346ddee925a1516df8',
  },
  'bsctest': {
    abi: pawswapAbi,
    address: '0x80a7be23b0222768e8bd41346ddee925a1516df8',
  },
  '0x539': {
    abi: pawswapAbi,
    address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9'
  }
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
    address: '0x4814458E93B24266635Fc71fc44669F7D69E80d5',
  },
  'bsctest': {
    abi: pawswapRouterAbi,
    address: '0x4814458E93B24266635Fc71fc44669F7D69E80d5',
  },
  'localdevchain': {
    abi: pawswapRouterAbi,
    address: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'
  },
  '0x539': {
    abi: pawswapRouterAbi,
    address: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'
  }
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
    address: '0x323F3C42D2009947B4eE13EcBdDa3a0e8025AfaE',
    initCodeHash: '0xcf3565c3fafd16be9fe1964038a53134ac87ae3781984eb501d0a56a5e0b5edb',
  },
  'bsctest': {
    abi: pawswapFactoryAbi,
    address: '0x323F3C42D2009947B4eE13EcBdDa3a0e8025AfaE',
    initCodeHash: '0xcf3565c3fafd16be9fe1964038a53134ac87ae3781984eb501d0a56a5e0b5edb',
  },
  'localdevchain': {
    abi: pawswapFactoryAbi,
    address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
    initCodeHash: '0xcf3565c3fafd16be9fe1964038a53134ac87ae3781984eb501d0a56a5e0b5edb'
  },
  '0x539': {
    abi: pawswapFactoryAbi,
    address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
    initCodeHash: '0xcf3565c3fafd16be9fe1964038a53134ac87ae3781984eb501d0a56a5e0b5edb'
  }
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
  'localdevchain': {
    abi: pancakeswapFactoryAbi,
    address: '',
    initCodeHash: '',
  },
  '0x539': {
    abi: pancakeswapFactoryAbi,
    address: '',
    initCodeHash: '',
  }
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
  'localdevchain': {
    abi: pancakeswapRouterAbi,
    address: '',
  },
  '0x539': {
    abi: pancakeswapRouterAbi,
    address: '',
  }
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
  primary: '#ff65b3',
  defaultBg: '#faf9fa',
  error: '#f03c4b'
}