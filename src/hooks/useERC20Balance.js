import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useERC20Balance = (params) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, chainId, account: walletAddress } = useMoralis();

  const [assets, setAssets] = useState();

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance().then((balance) => setAssets(balance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Balance = async () => {
    return await account
      .getTokenBalances({ address: walletAddress, chain: params?.chain || chainId })
      .then((result) => result);
  };

  return { fetchERC20Balance, assets };
};

export const useEthERC20Balance = (params) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress } = useMoralis();

  const [ethAssets, setAssets] = useState();

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance().then((balance) => setAssets(balance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, walletAddress]);

  const fetchERC20Balance = async () => {
    return await account
      .getTokenBalances({ address: walletAddress, chain: "0x1" })
      .then((result) => result);
  };

  return { fetchERC20Balance, ethAssets };
};

export const useBscERC20Balance = (params) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress } = useMoralis();

  const [bscAssets, setAssets] = useState();

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance().then((balance) => setAssets(balance));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, walletAddress]);

  const fetchERC20Balance = async () => {
    return await account
      .getTokenBalances({ address: walletAddress, chain: "0x38" })
      .then((result) => result);
  };

  return { fetchERC20Balance, bscAssets };
};
