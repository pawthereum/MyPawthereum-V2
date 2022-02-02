export const PAWTH_ADDRESS = {
  '0x1': '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f', // eth mainnet
  'eth': '0xaecc217a749c2405b5ebc9857a16d58bdc1c367f',
  '0x38': '0x409e215738e31d8ab252016369c2dd9c2008fee0', // bsc mainnet
  'bsc': '0x409e215738e31d8ab252016369c2dd9c2008fee0',
  '0x4': '', // rinkeby testnet
  '0x61': '0x8798D6DA45C92b1e5966285Fd3A0369154884efc', // bsc testnet
  'bsctest': '0x8798D6DA45C92b1e5966285Fd3A0369154884efc',
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
    address: '',
  },
  'bsc': {
    abi: pawswapAbi,
    address: '',
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

export const COLORS = {
  primary: '#ff65b3'
}