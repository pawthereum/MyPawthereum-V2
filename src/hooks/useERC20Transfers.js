import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useERC20Transfers = () => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress, chainId } = useMoralis();
  const [ERC20Transfers, setERC20Transfers] = useState();

  useEffect(() => {
    if (isInitialized) fetchERC20Transfers().then((result) => setERC20Transfers(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Transfers = async () => {
    return await account.getTokenTransfers({ address: walletAddress, chain: chainId }).then((result) => result.result);
  };
  return { fetchERC20Transfers, ERC20Transfers, chainId };
};

export const useEthERC20Transfers = () => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress } = useMoralis();
  const [ethERC20Transfers, setEthERC20Transfers] = useState();

  useEffect(() => {
    if (isInitialized) fetchERC20Transfers().then((result) => setEthERC20Transfers(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, walletAddress]);

  const fetchERC20Transfers = async () => {
    return await account.getTokenTransfers({ address: walletAddress, chain: "0x1" }).then((result) => result.result);
  };
  return { fetchERC20Transfers, ethERC20Transfers };
};

export const useBscERC20Transfers = () => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress } = useMoralis();
  const [bscERC20Transfers, setBscERC20Transfers] = useState();

  useEffect(() => {
    if (isInitialized) fetchERC20Transfers().then((result) => setBscERC20Transfers(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, walletAddress]);

  const fetchERC20Transfers = async () => {
    return await account.getTokenTransfers({ address: walletAddress, chain: "0x38" }).then((result) => result.result);
  };
  return { fetchERC20Transfers, bscERC20Transfers };
};
