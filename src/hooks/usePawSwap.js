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
  const { Moralis, account, web3 } = useMoralis();
  const [tokenList, setTokenlist] = useState();

  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["oneInch"]) return null;
    Moralis.Plugins.oneInch.getSupportedTokens({ chain }).then((tokens) => setTokenlist(tokens.tokens));
  }, [Moralis, Moralis.Plugins, chain]);

  async function getSwapQuote (params, taxes) {
    console.log('params', params)
    const quote = await getQuote(params)
    if (!taxes || !taxes.find(t => t.isTotal)) return quote
    const totalTax = parseFloat(taxes.find(t => t.isTotal).amount.replace('%', ''))

    const liqTax = taxes.find(t => t.isLiquidityTax)
    const liqTaxAmt = liqTax ? parseFloat(liqTax.amount.replace('%', '')) : 0

    const customTaxAmt = params.customTaxAmount ? parseFloat(params.customTaxAmount) : 0

    const quoteAmtPreTax = parseFloat(quote.toTokenAmount)
    const quoteAmtPostTax = quoteAmtPreTax - (quoteAmtPreTax * (totalTax + liqTaxAmt + customTaxAmt) / 100)
    quote.toTokenAmount = quoteAmtPostTax.toString()
    return quote
  }
  
  async function hasAllowance (amount, token, spender) {
    if (IsNative(token.address)) return true
    if (process.env.NODE_ENV !== 'production' && chain === 'bsctest') {
      if (IsNativeTest(token.address)) return true
    }
    
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      token.address,
      ERC20ABI, 
      web3.getSigner()
    )

    const tokenAllowance = await tokenContract.allowance(
      account,
      allowanceSpenderAddress(spender, chain),
    )

    if (parseInt(tokenAllowance) < parseInt(amount)) {
      return false
    }
  }

  async function updateAllowance (amount, token, spender) {
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      token.address,
      ERC20ABI, 
      web3.getSigner()
    )

    await tokenContract.approve(
      allowanceSpenderAddress(spender, chain),
      Moralis.Units.Token(amount, token.decimals).toString()
    ).send({ from: account })
  }

  async function tryPawSwap(params) {
    const { fromToken, fromAmount, chain  } = params;
    console.log('params', params)
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address.toLowerCase() === PAWTH_ADDRESS[chain].toLowerCase()) {
      const web3Provider = Moralis.web3Library;

      const pawthereum = new web3Provider.Contract(
        fromToken.address,
        ERC20ABI, 
        web3.getSigner()
      )

      const pawthereumAllowance = await pawthereum.allowance(
        account,
        PAWSWAP[chain].address
      )

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
    const web3Provider = Moralis.web3Library;

    const pawswap = new web3Provider.Contract(
      PAWSWAP[params.chain].address,
      PAWSWAP[params.chain].abi, 
      web3.getSigner()
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
      }).on('transactionHash', hash => openNotification({
        message: '🔊 Transaction Submitted!',
        description: `${hash}`,
        link: networkConfigs[params.chain].blockExplorerUrl + 'tx/' + hash
      }))
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

  async function getQuote (params) {
    const { fromToken, fromAmount, toToken, chain  } = params;

    const web3Provider = Moralis.web3Library;

    const router = new web3Provider.Contract(
      PAWSWAP_ROUTER[params.chain].address,
      PAWSWAP_ROUTER[params.chain].abi, 
      web3.getSigner()
    )

    const amountOut = await router.getAmountsOut(
      Moralis.Units.Token(fromAmount, fromToken.decimals).toString(),
      [fromToken.address, toToken.address]
    )

    console.log('amount out', amountOut)

    // const quote = await router.methods.quote(
    //   Moralis.Units.Token(fromAmount, fromToken.decimals).toString(),
    //   fromToken.address,
    //   toToken.address
    // ).call()

    return {
      toTokenAmount: amountOut[1],
      toToken,
      fromToken,
      fromAmount,
      chain
    }
  }

  async function getLiqQuote (params) {
    console.log('LIQ params~~~~~~~~~~~~~~~~~', params)
    return await getQuote(params)
  }

  async function tryAddLiquidity (params) {
    const { fromToken, fromAmount, toToken, toAmount, chain  } = params
    console.log('params', params)
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address.toLowerCase() === PAWTH_ADDRESS[chain].toLowerCase()) {
      const web3Provider = Moralis.web3Library;

      const pawthereum = new web3Provider.Contract(
        fromToken.address,
        ERC20ABI, 
        web3.getSigner()
      )

      const pawthereumAllowance = await pawthereum.allowance(
        account,
        PAWSWAP_ROUTER[chain].address
      )

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
    const web3Provider = Moralis.web3Library;

    const router = new web3Provider.Contract(
      PAWSWAP_ROUTER[params.chain].address,
      PAWSWAP_ROUTER[params.chain].abi, 
      web3.getSigner()
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

    const testnetBnb = networkConfigs.bsctest.wrapped
    if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ||
        tokenAddress === testnetBnb) return null
    
    const web3Provider = Moralis.web3Library

    const pawswap = new web3Provider.Contract(
      PAWSWAP[params.chain].address,
      PAWSWAP[params.chain].abi, 
      web3.getSigner()
    )

    const taxStructureContractAddress = await pawswap.tokenTaxContracts(
      tokenAddress
    )

    const taxStructureContract = new web3Provider.Contract(
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
        const taxes = [
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
            isLiquidityTax: true,
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
        ].filter(t => t.amount !== '0%')
        
        taxes.push({
          name: 'Total Buy Tax',
          isTotal: true,
          amount: taxes.reduce(function (p, t) {
            if (t.amount === 0) return p + 0
            return p + parseFloat(t.amount.replace('%', ''))
          }, 0) + '%'
        })
        console.log('taxes```````=======LLLLLL', taxes)
        return taxes
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
        const taxes = [
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
        ].filter(t => t.amount !== '0%')
        
        taxes.push({
          name: 'Total Sell Tax',
          isTotal: true,
          amount: taxes.reduce(function (p, t) {
            if (t.amount === 0) return p + 0
            return p + parseFloat(t.amount.replace('%', ''))
          }, 0) + '%'
        })
        return taxes
      })
      .catch(err => err)
    }

    console.log('taxes', taxes)

    return taxes
  }

  return { getSwapQuote, tryPawSwap, tokenList, getTaxStructure, hasAllowance, updateAllowance, getLiqQuote, tryAddLiquidity };
};

export default usePawSwap;
