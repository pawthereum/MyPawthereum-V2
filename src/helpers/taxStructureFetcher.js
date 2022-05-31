export const getTaxStructure = async ({ taxStructContract, account, includeWallets, includeRouterAddress }) => {
  let taxList = []
  let walletList = [null, null, null, null, null, null, null]
  let routerAddress
  try {
    taxList = await Promise.all([
      taxStructContract.burnTaxBuyAmount(account),
      taxStructContract.burnTaxSellAmount(account),
      taxStructContract.liquidityTaxBuyAmount(account),
      taxStructContract.liquidityTaxSellAmount(account),
      taxStructContract.tokenTaxName(),
      taxStructContract.tokenTaxBuyAmount(account),
      taxStructContract.tokenTaxSellAmount(account),
      taxStructContract.tax1Name(),
      taxStructContract.tax1BuyAmount(account),
      taxStructContract.tax1SellAmount(account),
      taxStructContract.tax2Name(),
      taxStructContract.tax2BuyAmount(account),
      taxStructContract.tax2SellAmount(account),
      taxStructContract.tax3Name(),
      taxStructContract.tax3BuyAmount(account),
      taxStructContract.tax3SellAmount(account),
      taxStructContract.tax4Name(),
      taxStructContract.tax4BuyAmount(account),
      taxStructContract.tax4SellAmount(account),
      taxStructContract.customTaxName(),
      taxStructContract.feeDecimal(),
    ])
    if (includeRouterAddress) {
      routerAddress = await taxStructContract.routerAddress()
    }
    if (includeWallets) {
      walletList = await Promise.all([
        taxStructContract.burnAddress(),
        taxStructContract.lpTokenHolder(),
        taxStructContract.tokenTaxWallet(),
        taxStructContract.tax1Wallet(),
        taxStructContract.tax2Wallet(),
        taxStructContract.tax3Wallet(),
        taxStructContract.tax4Wallet()
      ])
    }
  } catch (e) {
    console.log('error getting tax list', e)
    return e
  }
  const taxes = [
    {
      name: 'Burn Tax',
      buy: taxList[0],
      sell: taxList[1],
      isBurn: true,
      preSwapSellTaxAmount: 1,
      preSwapBuyTaxAmount: 0,
      postSwapSellTaxAmount: 0,
      postSwapBuyTaxAmount: 1,
      wallet: walletList[0],
    },
    {
      name: 'Liquidity Tax',
      buy: taxList[2],
      sell: taxList[3],
      isLiquidity: true,
      preSwapSellTaxAmount: 0.5,
      preSwapBuyTaxAmount: 0.5,
      postSwapSellTaxAmount: 0.5,
      postSwapBuyTaxAmount: 0.5,
      wallet: walletList[1]
    },
    {
      name: taxList[4],
      buy: taxList[5],
      sell: taxList[6],
      isTokenTax: true,
      preSwapSellTaxAmount: 1,
      preSwapBuyTaxAmount: 0,
      postSwapSellTaxAmount: 0,
      postSwapBuyTaxAmount: 1,
      wallet: walletList[2],
    },
    {
      name: taxList[7],
      buy: taxList[8],
      sell: taxList[9],
      isTax1: true,
      preSwapSellTaxAmount: 0,
      preSwapBuyTaxAmount: 1,
      postSwapSellTaxAmount: 1,
      postSwapBuyTaxAmount: 0,
      wallet: walletList[3],
    },
    {
      name: taxList[10],
      buy: taxList[11],
      sell: taxList[12],
      isTax2: true,
      preSwapSellTaxAmount: 0,
      preSwapBuyTaxAmount: 1,
      postSwapSellTaxAmount: 1,
      postSwapBuyTaxAmount: 0,
      wallet: walletList[4],
    },
    {
      name: taxList[13],
      buy: taxList[14],
      sell: taxList[15],
      isTax3: true,
      preSwapSellTaxAmount: 0,
      preSwapBuyTaxAmount: 1,
      postSwapSellTaxAmount: 1,
      postSwapBuyTaxAmount: 0,
      wallet: walletList[5],
    },
    {
      name: taxList[16],
      buy: taxList[17],
      sell: taxList[18],
      isTax4: true,
      preSwapSellTaxAmount: 0,
      preSwapBuyTaxAmount: 1,
      postSwapSellTaxAmount: 1,
      postSwapBuyTaxAmount: 0,
      wallet: walletList[6],
    },
    {
      name: taxList[19],
      buy: 0,
      sell: 0,
      isCustom: true,
      preSwapSellTaxAmount: 0,
      preSwapBuyTaxAmount: 1,
      postSwapSellTaxAmount: 1,
      postSwapBuyTaxAmount: 0,
      wallet: walletList[7],
    }
  ]
  return { taxes, feeDecimal: taxList[20], router: taxList[21], routerAddress }
}