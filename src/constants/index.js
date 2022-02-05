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
  '0x61': '0x68Bbe821a9063B7Acd9e8b45D6C52CD2d9fC9575', // bsc testnet
  'bsctest': '0x68Bbe821a9063B7Acd9e8b45D6C52CD2d9fC9575',
}

export const SNAPSHOT_URL = 'pawthereum.eth'

export const TOTAL_SUPPLY = 858000000

export const DISQUS_ID = 'mypawth'

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
    address: '0x9F4a7a0D5A01901Fd16124cC23356e7f83826651',
  },
  'bsctest': {
    abi: pawswapAbi,
    address: '0x9F4a7a0D5A01901Fd16124cC23356e7f83826651',
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
    address: '0x47a92204b04d64afa167d487f230e31aa1a9d400',
  },
  'bsctest': {
    abi: pawswapRouterAbi,
    address: '0x47a92204b04d64afa167d487f230e31aa1a9d400',
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
    address: '0x5ad2588fbd8a095845b05456ab83c22ec669081d',
  },
  'bsctest': {
    abi: pawswapFactoryAbi,
    address: '0x5ad2588fbd8a095845b05456ab83c22ec669081d',
  },
}

export const COLORS = {
  primary: '#ff65b3'
}