import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { PAWSWAP, PAWTH_ADDRESS, ERC20ABI, TAX_STRUCTURE_ABI, PAWSWAP_ROUTER, PAWSWAP_FACTORY } from '../constants'
import { notification } from "antd";
import { networkConfigs } from '../helpers/networks'

const IsNative = (address) => address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const IsNativeTest = (address) => address === '0xae13d989dac2f0debff460ac112a837c89baa7cd';

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

const allowanceSpenderAddress = (spender, chain) => {
  switch (spender) {
    case 'router':
      return PAWSWAP_ROUTER[chain].address
    default:
      return PAWSWAP[chain].address
  }
}

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
  
  async function hasAllowance (amount, token, spender) {
    if (IsNative(token.address)) return true
    if (process.env.NODE_ENV !== 'production' && chain === 'bsctest') {
      if (IsNativeTest(token.address)) return true
    }
    
    const web3Provider = await Moralis.enableWeb3();

    const tokenContract = new web3Provider.eth.Contract(
      ERC20ABI, 
      token.address
    )

    const tokenAllowance = await tokenContract.methods.allowance(
      account,
      allowanceSpenderAddress(spender, chain),
    ).call()

    if (parseInt(tokenAllowance) < parseInt(amount)) {
      return false
    }
  }

  async function updateAllowance (amount, token, spender) {
    const web3Provider = await Moralis.enableWeb3();

    const tokenContract = new web3Provider.eth.Contract(
      ERC20ABI, 
      token.address
    )

    await tokenContract.methods.approve(
      allowanceSpenderAddress(spender, chain),
      Moralis.Units.Token(amount, token.decimals).toString()
    ).send({ from: account })
  }

  async function tryPawSwap(params) {
    const { fromToken, fromAmount, chain  } = params;
    console.log('params', params)
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address.toLowerCase() === PAWTH_ADDRESS[chain].toLowerCase()) {
      const web3Provider = await Moralis.enableWeb3();

      const pawthereum = new web3Provider.eth.Contract(
        ERC20ABI, 
        fromToken.address
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
    const web3Provider = await Moralis.enableWeb3();

    const pawswap = new web3Provider.eth.Contract(
      PAWSWAP[params.chain].abi, 
      PAWSWAP[params.chain].address
    )

    const customTaxWallet = params.shelter ? params.shelter.address : account
    const customTaxAmount = params.customTaxAmount ? params.customTaxAmount * 100 : 0  
        
    if (params.toToken.address.toLowerCase() === PAWTH_ADDRESS[params.chain].toLowerCase()) {
      return await pawswap.methods.buyOnPawSwap(
        params.toToken.address,
        customTaxAmount, 
        customTaxWallet, 
        0,
        0
      ).send({ 
        from: account, 
        value: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString() 
      })
    }
    
    return await pawswap.methods.sellOnPawSwap(
      params.fromToken.address,
      Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(), 
      customTaxAmount, 
      customTaxWallet, 
      0,
      0
    ).send({ from: account })
  }

  async function getLiqQuote (params) {
    const { fromToken, fromAmount, toToken, chain  } = params;

    const web3Provider = await Moralis.enableWeb3();

    const router = new web3Provider.eth.Contract(
      PAWSWAP_ROUTER[params.chain].abi, 
      PAWSWAP_ROUTER[params.chain].address
    )

    const quote = await router.methods.quote(
      Moralis.Units.Token(fromAmount, fromToken.decimals).toString(),
      fromToken.address,
      toToken.address
    ).call()

    return {
      toTokenAmount: quote,
      toToken,
      fromToken,
      fromAmount,
      chain
    }
  }

  async function tryAddLiquidity (params) {
    const { fromToken, fromAmount, toToken, toAmount, chain  } = params
    console.log('params', params)
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address.toLowerCase() === PAWTH_ADDRESS[chain].toLowerCase()) {
      const web3Provider = await Moralis.enableWeb3();

      const pawthereum = new web3Provider.eth.Contract(
        ERC20ABI, 
        fromToken.address
      )

      const pawthereumAllowance = await pawthereum.methods.allowance(
        account,
        PAWSWAP_ROUTER[chain].address
      ).call()

      if (parseInt(pawthereumAllowance) < parseInt(amount)) {
        await pawthereum.methods.approve(
          PAWSWAP_ROUTER[chain].address,
          amount
        ).send({ from: account })
      }

    }

    await doAddLiquidity(params)
      .then((receipt) => {
        console.log('receipt', receipt)
        if (receipt.statusCode !== 400) {
          const link = networkConfigs[params.chain].blockExplorerUrl + 'tx/' + receipt.transactionHash
          openNotification({
            message: "🎉 Liquidity Added!",
            description: `${receipt.transactionHash}`,
            link
          });
          console.log(receipt);
        }
      })
      .catch((e) => {
        console.log('error', e)
        openNotification({
          message: "⚠️ Liquidity Add Error!",
          description: `${e.message}`
        });
      });
  }

  async function doAddLiquidity(params) {
    const web3Provider = await Moralis.enableWeb3();

    const router = new web3Provider.eth.Contract(
      PAWSWAP_ROUTER[params.chain].abi, 
      PAWSWAP_ROUTER[params.chain].address
    )
    console.log('adoing with router', router)
    console.log(params)

    const deadlineMinutes = 20 // default to an arbitrary 20m deadline

    return await router.methods.addLiquidityETH(
      params.toToken.address,
      params.toTokenAmount,
      0,
      0,
      account,
      new Date().getTime() + deadlineMinutes * 60000
    ).send({ 
      from: account, 
      value: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString() 
    })
  }

  async function getTaxStructure (params) {
    if (!PAWSWAP[params.chain].address) return []
    const { tokenAddress, side } = params
    console.log('tokenAddress', tokenAddress)

    const testnetBnb = networkConfigs.bsctest.wrapped
    if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ||
        tokenAddress === testnetBnb) return null
    
    const web3Provider = await Moralis.enableWeb3();

    const pawswap = new web3Provider.eth.Contract(
      PAWSWAP[params.chain].abi, 
      PAWSWAP[params.chain].address
    )

    console.log(PAWSWAP[params.chain].address)

    console.log('tokenAddr', tokenAddress)

    const taxStructureContractAddress = await pawswap.methods.tokenTaxContracts(
      tokenAddress
    ).call((err, result) => {
      console.log('err', err)
      console.log('result', result)
    })

    const taxStructureContract = new web3Provider.eth.Contract(
      TAX_STRUCTURE_ABI, 
      taxStructureContractAddress
    )

    let taxes = {}

    if (side === 'buy') {
      taxes = await Promise.all([
        taxStructureContract.methods.tax1Name().call(),
        taxStructureContract.methods.tax1BuyAmount().call(),
        taxStructureContract.methods.tax2Name().call(),
        taxStructureContract.methods.tax2BuyAmount().call(),
        taxStructureContract.methods.tax3Name().call(),
        taxStructureContract.methods.tax3BuyAmount().call(),
        taxStructureContract.methods.tax4Name().call(),
        taxStructureContract.methods.tax4BuyAmount().call(),
        taxStructureContract.methods.tokenTaxName().call(),
        taxStructureContract.methods.tokenTaxBuyAmount().call(),
        taxStructureContract.methods.liquidityTaxBuyAmount().call(),
        taxStructureContract.methods.burnTaxBuyAmount().call(),
        taxStructureContract.methods.customTaxName().call(),
        taxStructureContract.methods.feeDecimal().call()
      ])
      .then(([ 
        tax1Name, tax1Amount, tax2Name, tax2Amount, 
        tax3Name, tax3Amount, tax4Name, tax4Amount,
        tokenTaxName, tokenTaxAmount, liquidityTaxAmount,
        burnTaxAmount, customTaxName, feeDecimal ]) => {
        return ([
          {
            name: tax1Name,
            amount: parseFloat(tax1Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tax2Name,
            amount: parseFloat(tax2Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tax3Name,
            amount: parseFloat(tax3Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tax4Name,
            amount: parseFloat(tax4Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tokenTaxName,
            amount: parseFloat(tokenTaxAmount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: 'Liquidity Tax',
            amount: parseFloat(liquidityTaxAmount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: 'Burn Tax',
            amount: parseFloat(burnTaxAmount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: customTaxName,
            amount: 0,
            isCustom: true
          }
        ].filter(t => t.amount !== '0%'))
      })
      .catch(err => err)
    }

    if (side === 'sell') {
      taxes = await Promise.all([
        taxStructureContract.methods.tax1Name().call(),
        taxStructureContract.methods.tax1SellAmount().call(),
        taxStructureContract.methods.tax2Name().call(),
        taxStructureContract.methods.tax2SellAmount().call(),
        taxStructureContract.methods.tax3Name().call(),
        taxStructureContract.methods.tax3SellAmount().call(),
        taxStructureContract.methods.tax4Name().call(),
        taxStructureContract.methods.tax4SellAmount().call(),
        taxStructureContract.methods.tokenTaxName().call(),
        taxStructureContract.methods.tokenTaxSellAmount().call(),
        taxStructureContract.methods.liquidityTaxSellAmount().call(),
        taxStructureContract.methods.burnTaxSellAmount().call(),
        taxStructureContract.methods.customTaxName().call(),
        taxStructureContract.methods.feeDecimal().call()
      ])
      .then(([ 
        tax1Name, tax1Amount, tax2Name, tax2Amount, 
        tax3Name, tax3Amount, tax4Name, tax4Amount,
        tokenTaxName, tokenTaxAmount, liquidityTaxAmount,
        burnTaxAmount, customTaxName, feeDecimal ]) => {
        return ([
          {
            name: tax1Name,
            amount: parseFloat(tax1Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tax2Name,
            amount: parseFloat(tax2Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tax3Name,
            amount: parseFloat(tax3Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tax4Name,
            amount: parseFloat(tax4Amount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: tokenTaxName,
            amount: parseFloat(tokenTaxAmount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: 'Liquidity Tax',
            amount: parseFloat(liquidityTaxAmount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: 'Burn Tax',
            amount: parseFloat(burnTaxAmount) / 10**parseInt(feeDecimal) + '%'
          },
          {
            name: customTaxName,
            amount: 0,
            isCustom: true
          }
        ].filter(t => t.amount !== '0%'))
      })
      .catch(err => err)
    }

    console.log('taxes', taxes)

    return taxes
  }

  return { getQuote, tryPawSwap, tokenList, getTaxStructure, hasAllowance, updateAllowance, getLiqQuote, tryAddLiquidity };
};

export default usePawSwap;
