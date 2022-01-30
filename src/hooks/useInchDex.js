import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { SLIPPAGE } from '../constants'
import { notification } from "antd";
import { networkConfigs } from '../helpers/networks'

const openNotification = ({ message, description, link }) => {
  notification.open({
    message,
    description,
    onClick: () => {
      if (!link) return
      window.location.href = link
    },
    placement: 'topRight'
  });
};

const useInchDex = (chain) => {
  const { Moralis, account } = useMoralis();
  const [tokenList, setTokenlist] = useState();

  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["oneInch"]) return null;
    if (chain === 'bsctest' || chain === '0x61') return {}
    Moralis.Plugins.oneInch.getSupportedTokens({ chain }).then((tokens) => {
      const native = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      let validTokens = {}
      validTokens[native] = tokens.tokens[native]
      setTokenlist(validTokens)
    });
  }, [Moralis, Moralis.Plugins, chain]);

  const getQuote = async (params) =>
    await Moralis.Plugins.oneInch.quote({
      chain: params.chain, // The blockchain  you want to use (eth/bsc/polygon)
      fromTokenAddress: params.fromToken.address, // The token you want to swap
      toTokenAddress: params.toToken.address, // The token you want to receive
      amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(),
    });

  async function trySwap(params) {
    const { fromToken, fromAmount, chain } = params;
    console.log('trying', params)
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      await Moralis.Plugins.oneInch
        .hasAllowance({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: fromToken.address, // The token you want to swap
          fromAddress: account, // Your wallet address
          amount,
        })
        .then(async (allowance) => {
          console.log(allowance);
          if (!allowance) {
            await Moralis.Plugins.oneInch.approve({
              chain, // The blockchain you want to use (eth/bsc/polygon)
              tokenAddress: fromToken.address, // The token you want to swap
              fromAddress: account, // Your wallet address
            });
          }
        })
        .catch((e) => alert(e.message));
    }

    await doSwap(params)
      .then((receipt) => {
        if (receipt.statusCode !== 400) {
          const link = networkConfigs[params.chain].blockExplorerUrl + 'tx/' + receipt.transactionHash
          openNotification({
            message: "🎉 Swap Complete!",
            description: `${receipt.transactionHash}`,
            link
          });
          console.log(receipt);
        }
      })
      .catch((e) => {
        console.log('error', e)
        openNotification({
          message: "⚠️ Swap Error!",
          description: `${e.message}`
        });
      });
  }

  async function doSwap(params) {
    const slippage = SLIPPAGE[params.chain]
    console.log('doing swap with params', params)
    console.log('and slip', slippage)
    return await Moralis.Plugins.oneInch.swap({
      chain: params.chain, // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: params.fromToken.address, // The token you want to swap
      toTokenAddress: params.toToken.address, // The token you want to receive
      amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(),
      fromAddress: account, // Your wallet address
      slippage,
    });
  }

  return { getQuote, trySwap, tokenList };
};

export default useInchDex;
