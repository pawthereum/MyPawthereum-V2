import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useERC20Balance = (params) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, chainId, account: walletAddress } = useMoralis();

  const [assets, setAssets] = useState();

  const unsupportedChains = ['0x539']

  useEffect(() => {
    if (isInitialized && walletAddress && chainId) {
      fetchERC20Balance().then((balance) => setAssets(balance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Balance = async () => {
    if (unsupportedChains.includes(chainId)) return
    return await account
      .getTokenBalances({ address: walletAddress, chain: params?.chain || chainId })
      .then((result) => result);
  };

  return { fetchERC20Balance, assets };
};
