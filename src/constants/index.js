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
  '0x61': '0x716A8aa18afEfae3742bBD547045Dc43E87F8E92', // bsc testnet
  'bsctest': '0x716A8aa18afEfae3742bBD547045Dc43E87F8E92',
  'localdevchain': '0x58CDCaC4CedCb3fA27d65F60Bb5a09F0Fad5DB2a',
  '0x539': '0x58CDCaC4CedCb3fA27d65F60Bb5a09F0Fad5DB2a'
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
    address: '0x59659F96a63BCe77351642aFA060c4c12E239e41',
  },
  'bsctest': {
    abi: pawswapAbi,
    address: '0x59659F96a63BCe77351642aFA060c4c12E239e41',
  },
  '0x539': {
    abi: pawswapAbi,
    address: '0x6409C7E8409763c47d121416F8ed997CA0571d8D'
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
    address: '0xfdCd4e7912CAF173504C76700eD8F42a06c08F2C',
  },
  'bsctest': {
    abi: pawswapRouterAbi,
    address: '0xfdCd4e7912CAF173504C76700eD8F42a06c08F2C',
  },
  'localdevchain': {
    abi: pawswapRouterAbi,
    address: '0x279C3ef32d4e422547483304dAc692C7ABEA7280'
  },
  '0x539': {
    abi: pawswapRouterAbi,
    address: '0x279C3ef32d4e422547483304dAc692C7ABEA7280'
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
    address: '0xBe0058a8fd8867F224950206F5C4eB210710B250',
    initCodeHash: '0x20b12f2b70897893a1441d8b2fa329add1df110ca39a25687332ada21d161b87',
  },
  'bsctest': {
    abi: pawswapFactoryAbi,
    address: '0xBe0058a8fd8867F224950206F5C4eB210710B250',
    initCodeHash: '0x20b12f2b70897893a1441d8b2fa329add1df110ca39a25687332ada21d161b87',
  },
  'localdevchain': {
    abi: pawswapFactoryAbi,
    address: '0x754511F1c15532fEc424FE724154acA4ea29FB73',
    initCodeHash: '0x048602781262cfac6d42a7e607eec280f5199d68b80bc1ec6c6f7176fc2b54ca'
  },
  '0x539': {
    abi: pawswapFactoryAbi,
    address: '0x754511F1c15532fEc424FE724154acA4ea29FB73',
    initCodeHash: '0x048602781262cfac6d42a7e607eec280f5199d68b80bc1ec6c6f7176fc2b54ca'
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