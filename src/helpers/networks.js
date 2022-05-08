export const networkConfigs = {
  "0x1": {
    currencySymbol: "ETH",
    currencyName: 'Ether',
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    network: 'main',
  },
  "eth": {
    currencySymbol: "ETH",
    currencyName: 'Ether',
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    network: 'main',
  },
  "0x3": {
    currencySymbol: "ETH",
    currencyName: 'Ether',
    blockExplorerUrl: "https://ropsten.etherscan.io/",
    network: 'test',
  },
  "0x4": {
    currencySymbol: "ETH",
    currencyName: 'Ether',
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
    network: 'test',
  },
  "0x2a": {
    currencySymbol: "ETH",
    currencyName: 'Ether',
    blockExplorerUrl: "https://kovan.etherscan.io/",
    network: 'test',
  },
  "0x5": {
    currencySymbol: "ETH",
    currencyName: 'Ether',
    blockExplorerUrl: "https://goerli.etherscan.io/",
    network: 'test',
  },
  "0x539": {
    chainName: "Local Chain",
    currencySymbol: "ETH",
    currencyName: 'Ether',
    rpcUrl: "http://127.0.0.1:7545",
    network: 'test',
  },
  "0xa86a": {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/",
    network: 'main',
  },
  "0x38": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    network: 'main',
  },
  "bsc": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    network: 'main',
  },
  "bsctest": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
    wrapped: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    network: 'test',
  },
  "0x61": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
    wrapped: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    network: 'test',
  },
  "0x89": {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://explorer-mainnet.maticvigil.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    network: 'main',
  },
  "0x13881": {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
    network: 'test',
  },
};

export const getNativeByChain = (chain) =>
  networkConfigs[chain]?.currencySymbol || "NATIVE";

export const getChainById = (chain) => networkConfigs[chain]?.chainId || null;

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;

export const getWrappedNative = (chain) =>
  networkConfigs[chain]?.wrapped || null;
