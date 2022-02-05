import { pawswapRouterAbi } from './abis/pawswapRouter'
import { pawswapFactoryAbi } from './abis/pawswapFactory'

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

export const ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
const pawswapAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethSpent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"customTaxAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"customTaxAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"extraTax1Amount","type":"uint256"}],"name":"Buy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensSold","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"customTaxAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"customTaxAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"extraTax1Amount","type":"uint256"}],"name":"Sell","type":"event"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"customTaxAmount","type":"uint256"},{"internalType":"address","name":"customTaxAddress","type":"address"},{"internalType":"uint256","name":"extraTax1Amount","type":"uint256"},{"internalType":"uint256","name":"minTokensToReceive","type":"uint256"}],"name":"buyOnPawSwap","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokensToSwap","type":"uint256"},{"internalType":"uint256","name":"customTaxAmount","type":"uint256"},{"internalType":"address","name":"customTaxAddress","type":"address"},{"internalType":"uint256","name":"extraTax1Amount","type":"uint256"},{"internalType":"uint256","name":"minEthToReceive","type":"uint256"}],"name":"sellOnPawSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_taxStructureContractAddress","type":"address"}],"name":"setTokenTaxContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenTaxContracts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEthToOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokenToOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const TAX_STRUCTURE_ABI = [{"inputs":[{"internalType":"address","name":"_pawthereum","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"oldName","type":"string"},{"indexed":false,"internalType":"string","name":"newName","type":"string"}],"name":"CustomTaxNameUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldDecimal","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newDecimal","type":"uint256"}],"name":"FeeDecimalUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldRouter","type":"address"},{"indexed":false,"internalType":"address","name":"newRouter","type":"address"}],"name":"RouterUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"oldName","type":"string"},{"indexed":false,"internalType":"address","name":"oldWallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"oldBuyAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldSellAmount","type":"uint256"},{"indexed":false,"internalType":"string","name":"newName","type":"string"},{"indexed":false,"internalType":"address","name":"newWallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"newBuyAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newSellAmount","type":"uint256"}],"name":"TaxUpdated","type":"event"},{"inputs":[],"name":"burnAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxBuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxBuyAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxSellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTaxSellAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"customTaxName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeDecimal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityTaxBuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityTaxBuyAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityTaxSellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityTaxSellAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpTokenHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purrBuyFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purrSellFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"routerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_burnAddress","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setBurnTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"setCustomTaxName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newDecimal","type":"uint256"}],"name":"setFeeDecimal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lpTokenHolder","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setLiquidityTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pawthereum","type":"address"}],"name":"setPawthereum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_respectPurr","type":"bool"},{"internalType":"uint256","name":"_purrBuyFactor","type":"uint256"},{"internalType":"uint256","name":"_purrSellFactor","type":"uint256"}],"name":"setPurrConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newRouterAddress","type":"address"}],"name":"setRouterAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setTax1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setTax2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setTax3","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setTax4","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_buyAmount","type":"uint256"},{"internalType":"uint256","name":"_sellAmount","type":"uint256"}],"name":"setTokenTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tax1BuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax1BuyAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax1Name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax1SellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax1SellAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax1Wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax2BuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax2BuyAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax2Name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax2SellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax2SellAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax2Wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax3BuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax3BuyAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax3Name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax3SellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax3SellAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax3Wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax4BuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax4Name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax4SellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tax4Wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenTaxBuyAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenTaxBuyAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenTaxName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenTaxSellAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenTaxSellAmountConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenTaxWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEthToOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokenToOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

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