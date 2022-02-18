import { pawswapRouterAbi } from './abis/pawswapRouter'
import { pawswapFactoryAbi } from './abis/pawswapFactory'
import { ERC20Abi } from './abis/erc20'
import { taxStructureAbi } from './abis/taxStructure'
import { pawswapAbi } from './abis/pawswap'

export const PAWTH_ADDRESS = {
  '0x1': '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f', // eth mainnet
  'eth': '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f',
  '0x38': '0x409e215738e31d8ab252016369c2dd9c2008fee0', // bsc mainnet
  'bsc': '0x409e215738e31d8ab252016369c2dd9c2008fee0',
  '0x4': '', // rinkeby testnet
  '0x61': '0x33ec6D5bdb757109C6929eB9c0B21c23f6a694a8', // bsc testnet
  'bsctest': '0x33ec6D5bdb757109C6929eB9c0B21c23f6a694a8',
}

export const COINGECKO_ID = 'pawthereum'

export const SNAPSHOT_URL = 'pawthereum.eth'

export const TOTAL_SUPPLY = 858000000

export const DISQUS_ID = 'mypawth'

export const DECIMALS = 9

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
    address: '0x9aE4AB89841DAf1B174cD9dbA10F8a493531d651',
  },
  'bsctest': {
    abi: pawswapAbi,
    address: '0x9aE4AB89841DAf1B174cD9dbA10F8a493531d651',
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
    address: '0x58c7028A02C8e73C3d2dC784bcd90BD849a94Bde',
  },
  'bsctest': {
    abi: pawswapRouterAbi,
    address: '0x58c7028A02C8e73C3d2dC784bcd90BD849a94Bde',
  },
}

export const PAWSWAP_FACTORY = {
  '0x1': {
    abi: pawswapFactoryAbi,
    address: '',
  },
  'eth': {
    abi: pawswapFactoryAbi,
    address: '',
  },
  '0x38': {
    abi: pawswapFactoryAbi,
    address: '',
  },
  'bsc': {
    abi: pawswapFactoryAbi,
    address: '',
  },
  '0x61': {
    abi: pawswapFactoryAbi,
    address: '0xAd40b45e2E94D4D78D40866Dde642881542aA5eD',
  },
  'bsctest': {
    abi: pawswapFactoryAbi,
    address: '0xAd40b45e2E94D4D78D40866Dde642881542aA5eD',
  },
}

export const COLORS = {
  primary: '#ff65b3'
}