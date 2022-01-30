import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { SLIPPAGE, PAWSWAP, PAWTH_ADDRESS, ERC20ABI } from '../constants'
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

const usePawSwap = (chain) => {
  const { Moralis, account } = useMoralis();
  const [tokenList, setTokenlist] = useState();

  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["oneInch"]) return null;
    Moralis.Plugins.oneInch.getSupportedTokens({ chain }).then((tokens) => setTokenlist(tokens.tokens));
  }, [Moralis, Moralis.Plugins, chain]);

  const getQuote = async (params) =>
    await Moralis.Plugins.oneInch.quote({
      chain: params.chain, // The blockchain  you want to use (eth/bsc/polygon)
      fromTokenAddress: params.fromToken.address, // The token you want to swap
      toTokenAddress: params.toToken.address, // The token you want to receive
      amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(),
    });

  async function tryPawSwap(params) {
    const { fromToken, fromAmount, chain  } = params;
    console.log('params', params)
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address.toLowerCase() === PAWTH_ADDRESS[chain].toLowerCase()) {
      const web3Provider = await Moralis.enableWeb3();

      const pawthereum = new web3Provider.eth.Contract(
        ERC20ABI, 
        PAWTH_ADDRESS[chain]
      )

      const pawthereumAllowance = await pawthereum.methods.allowance(
        account,
        PAWSWAP[chain].address
      ).call()

      if (parseInt(pawthereumAllowance) < parseInt(amount)) {
        await pawthereum.methods.approve(
          PAWSWAP[chain].address,
          amount
        ).send({ from: account })
      }

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
    const web3Provider = await Moralis.enableWeb3();

    const pawswap = new web3Provider.eth.Contract(
      PAWSWAP[params.chain].abi, 
      PAWSWAP[params.chain].address
    )

    const extraCharityWallet = params.shelter ? params.shelter.address : account
    const calculatedExtraCharityTax = params.extraCharityTax ? params.extraCharityTax * 100 : 0  
        
    if (params.toToken.address.toLowerCase() === PAWTH_ADDRESS[params.chain].toLowerCase()) {
      return await pawswap.methods.buyOnPawSwap(
        calculatedExtraCharityTax, 
        extraCharityWallet, 
        0,
        0
      ).send({ 
        from: account, 
        value: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString() 
      })
    }
    
    return await pawswap.methods.sellOnPawSwap(
      Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(), 
      calculatedExtraCharityTax, 
      extraCharityWallet, 
      0,
      0
    ).send({ from: account })
  }

  return { getQuote, tryPawSwap, tokenList };
};

export default usePawSwap;
