import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { networkConfigs } from "helpers/networks";

const useNative = () => {
  const { chainId, account } = useMoralis()
  const Web3Api = useMoralisWeb3Api();
  const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  const isNative = (address) => 
    address.toLowerCase() === nativeAddress ||
    address.toLowerCase() === networkConfigs[chainId]?.wrapped.toLowerCase()
  
  const getNativeBalance = async () => {
    const balanceReq = await Web3Api.account.getNativeBalance({
      chain: chainId,
      address: account
    })
    return balanceReq?.balance
  }

  return {
    getNativeBalance,
    isNative,
    nativeAddress
  }
}

export default useNative;