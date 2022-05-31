
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Token } from '@uniswap/sdk'
import { PAWSWAP, PAWSWAP_TAX_STRUCTURE_FACTORY, PANCAKESWAP_ROUTER } from '../constants'
import { taxStructureAbi } from 'constants/abis/taxStructure'
import { getTaxStructure } from 'helpers/taxStructureFetcher'
import { notification } from 'antd'
import { networkConfigs } from 'helpers/networks'

const openNotification = ({ message, description, link }) => {
  notification.open({
    message,
    description,
    onClick: () => {
      if (!link) return
      window.location.href = link
    },
    placement: 'topRight',
    duration: 10,
  });
};


const useListingContext = () => {
  const { chainId, Moralis, web3, account } = useMoralis()

  const [listCurrency, setListCurrency] = useState(null)
  const [listToken, setListToken] = useState(null)
  const [listTaxStructContract, setListTaxStructContract] = useState(null)
  const [listTaxStructFeeDecimal, setListTaxStructFeeDecimal] = useState(null)
  const [listTaxStructTax1Name, setListTaxStructTax1Name] = useState(null)
  const [listTaxStructTax1Address, setListTaxStructTax1Address] = useState(null)
  const [listTaxStructTax1Buy, setListTaxStructTax1Buy] = useState(null)
  const [listTaxStructTax1Sell, setListTaxStructTax1Sell] = useState(null)
  const [listTaxStructTax2Name, setListTaxStructTax2Name] = useState(null)
  const [listTaxStructTax2Address, setListTaxStructTax2Address] = useState(null)
  const [listTaxStructTax2Buy, setListTaxStructTax2Buy] = useState(null)
  const [listTaxStructTax2Sell, setListTaxStructTax2Sell] = useState(null)
  const [listTaxStructTax3Name, setListTaxStructTax3Name] = useState(null)
  const [listTaxStructTax3Address, setListTaxStructTax3Address] = useState(null)
  const [listTaxStructTax3Buy, setListTaxStructTax3Buy] = useState(null)
  const [listTaxStructTax3Sell, setListTaxStructTax3Sell] = useState(null)
  const [listTaxStructTax4Name, setListTaxStructTax4Name] = useState(null)
  const [listTaxStructTax4Address, setListTaxStructTax4Address] = useState(null)
  const [listTaxStructTax4Buy, setListTaxStructTax4Buy] = useState(null)
  const [listTaxStructTax4Sell, setListTaxStructTax4Sell] = useState(null)
  const [listTaxStructTokenTaxName, setListTaxStructTokenTaxName] = useState(null)
  const [listTaxStructTokenTaxAddress, setListTaxStructTokenTaxAddress] = useState(null)
  const [listTaxStructTokenTaxBuy, setListTaxStructTokenTaxBuy] = useState(null)
  const [listTaxStructTokenTaxSell, setListTaxStructTokenTaxSell] = useState(null)
  const [listTaxStructBurnTaxAddress, setListTaxStructBurnTaxAddress] = useState(null)
  const [listTaxStructBurnTaxBuy, setListTaxStructBurnTaxBuy] = useState(null)
  const [listTaxStructBurnTaxSell, seListTaxStructBurnTaxSell] = useState(null)
  const [listTaxStructLpTokenReceiver, setListTaxStructLpTokenReceiver] = useState(null)
  const [listTaxStructLiquidityTaxBuy, setListTaxStructLiquidityTaxBuy] = useState(null)
  const [listTaxStructLiquidityTaxSell, setListTaxStructLiquidityTaxSell] = useState(null)
  const [listTaxStructCustomTaxName, setListTaxStructCustomTaxName] = useState(null)
  const [listTaxStructRouterAddress, setListTaxStructRouterAddress] = useState(null)


  const taxes = [
    { isTax1: true, setName: setListTaxStructTax1Name, setAddress: setListTaxStructTax1Address, setBuy: setListTaxStructTax1Buy, setSell: setListTaxStructTax1Sell },
    { isTax2: true, setName: setListTaxStructTax2Name, setAddress: setListTaxStructTax2Address, setBuy: setListTaxStructTax2Buy, setSell: setListTaxStructTax2Sell },
    { isTax3: true, setName: setListTaxStructTax3Name, setAddress: setListTaxStructTax3Address, setBuy: setListTaxStructTax3Buy, setSell: setListTaxStructTax3Sell },
    { isTax4: true, setName: setListTaxStructTax4Name, setAddress: setListTaxStructTax4Address, setBuy: setListTaxStructTax4Buy, setSell: setListTaxStructTax4Sell },
    { isTokenTax: true, setName: setListTaxStructTokenTaxName, setAddress: setListTaxStructTokenTaxAddress, setBuy: setListTaxStructTokenTaxBuy, setSell: setListTaxStructTokenTaxSell },
    { isBurn: true, setName: ()=>{}, setAddress: setListTaxStructBurnTaxAddress, setBuy: setListTaxStructBurnTaxBuy, setSell: seListTaxStructBurnTaxSell },
    { isLiquidity: true, setName: ()=>{}, setAddress: setListTaxStructLpTokenReceiver, setBuy: setListTaxStructLiquidityTaxBuy, setSell: setListTaxStructLiquidityTaxSell },
    { isCustom: true, setName: setListTaxStructCustomTaxName, setAddress: ()=>{}, setBuy: ()=>{}, setSell: ()=>{} }
  ]

  const updateListCurrency = async (currency, preventTaxStructFetch) => {
    if (!currency) {
      setListCurrency(null)
      setListToken(null)
      setListTaxStructContract(null)
      return
    }
    const token = new Token(chainId, currency?.address, currency?.decimals, currency?.symbol, currency?.name)
    console.log('preventing', preventTaxStructFetch)
    if (!preventTaxStructFetch) {
      console.log('we SHOULD NOT be here')
      fetchTaxStructure(token?.address)
    }
    setListCurrency(currency)
    setListToken(token)
  }

  const clearTaxStructTaxes = () => {
    taxes.map(t => {
      t.setName(null)
      t.setAddress(null)
      t.setBuy(null)
      t.setSell(null)
      return t
    })
  }

  const fetchAndSetTaxStructTaxes = async (taxStructContract) => {
    try {
      const taxStructure = await getTaxStructure({
        taxStructContract, 
        account,
        includeWallets: true,
        includeRouterAddress: true
      })
      const taxChecks = ['isTax1', 'isTax2', 'isTax3', 'isTax4', 'isTokenTax', 'isBurn', 'isLiquidity']
      taxChecks.map(mapping => {
        const taxStruct = taxStructure.taxes.find(t => t[mapping])
        const tax = taxes.find(t => t[mapping])
        if (!taxStruct || !tax) return mapping
        tax.setName(taxStruct.name)
        tax.setAddress(taxStruct.wallet)
        tax.setBuy(taxStruct.buy)
        tax.setSell(taxStruct.sell)
        return mapping
      })
      setListTaxStructRouterAddress(taxStructure.routerAddress)
      setListTaxStructFeeDecimal(taxStructure.feeDecimal)
    } catch (e) {
      console.log('error fetching and setting tax struct taxes', e)
    }
  }

  useEffect(() => {
    if (!listTaxStructContract) return clearTaxStructTaxes()
    fetchAndSetTaxStructTaxes(listTaxStructContract)
  }, [listTaxStructContract])

  const fetchTaxStructure = async (tokenAddr) => {
    const web3Provider = Moralis.web3Library;
    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )
    try {
      const taxStructAddr = await pawswap.tokenTaxContracts(tokenAddr)
      const newStruct = new web3Provider.Contract(
        taxStructAddr,
        taxStructureAbi,
        web3.getSigner()
      )
      setListTaxStructContract(newStruct)
    } catch (e) {
      setListTaxStructContract({ error: e })
    }
  }

  const updateTaxStructureByAddress = async (taxStructAddr) => {
    const web3Provider = Moralis.web3Library;
    try {
      const newStruct = new web3Provider.Contract(
        taxStructAddr,
        taxStructureAbi,
        web3.getSigner()
      )
      setListTaxStructContract(newStruct)
    } catch (e) {
      setListTaxStructContract({ error: e })
    }
  }

  const setLiquidityTax = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setLiquidityTax(
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 Liquidity Tax update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: "🎉 Liquidity Tax updated!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting liquidity tax', e)
      return openNotification({
        message: "⚠️ Error setting liquidity tax!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setBurnTax = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setBurnTax(
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 Burn Tax update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: "🎉 Burn Tax updated!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting burn tax', e)
      return openNotification({
        message: "⚠️ Error setting burn tax!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setTokenTax = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setTokenTax(
        tax.name,
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 ${tax.name} update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 ${tax.name} updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting token tax', e)
      return openNotification({
        message: "⚠️ Error setting token tax!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setCustomTax = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setCustomTaxName(
        tax.name
      )
      openNotification({
        message: `🔊 ${tax.name} update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 ${tax.name} updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting token tax', e)
      return openNotification({
        message: "⚠️ Error setting token tax!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setRouterAddress = async (router) => {
    try {
      const updateReq = await listTaxStructContract.setRouterAddress(
        router.address
      )
      openNotification({
        message: `🔊 Router address update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 Router address updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting router address', e)
      return openNotification({
        message: "⚠️ Error setting router address!",
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setTax1 = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setTax1(
        tax.name,
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 ${tax.name} update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 ${tax.name} updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting tax 1', e)
      return openNotification({
        message: `⚠️ Error setting ${tax.name}!`,
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setTax2 = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setTax2(
        tax.name,
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 ${tax.name} update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 ${tax.name} updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting tax 2', e)
      return openNotification({
        message: `⚠️ Error setting ${tax.name}!`,
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setTax3 = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setTax3(
        tax.name,
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 ${tax.name} update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 ${tax.name} updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting tax 3', e)
      return openNotification({
        message: `⚠️ Error setting ${tax.name}!`,
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const setTax4 = async (tax) => {
    try {
      const updateReq = await listTaxStructContract.setTax3(
        tax.name,
        tax.address,
        Number(tax.buy) * 10**listTaxStructFeeDecimal,
        Number(tax.sell) * 10**listTaxStructFeeDecimal
      )
      openNotification({
        message: `🔊 ${tax.name} update submitted!`,
        description: `${updateReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + updateReq.hash
      });
      const tx = await updateReq.wait()
      openNotification({
        message: `🎉 ${tax.name} updated!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error setting tax 4', e)
      return openNotification({
        message: `⚠️ Error setting ${tax.name}!`,
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  const updateTaxSetting = async (tax) => {
    if (tax.isLiquidity) await setLiquidityTax(tax)
    if (tax.isBurn) await setBurnTax(tax)
    if (tax.isTokenTax) await setTokenTax(tax)
    if (tax.isTax1) await setTax1(tax)
    if (tax.isTax2) await setTax2(tax)
    if (tax.isTax3) await setTax3(tax)
    if (tax.isTax4) await setTax4(tax)
    if (tax.isCustom) await setCustomTax(tax)
    if (tax.isRouter) await setRouterAddress(tax)
    await fetchAndSetTaxStructTaxes(listTaxStructContract)
    return
  }

  const deployTaxStructure = async () => {
    const web3Provider = Moralis.web3Library;
    const taxStructFactory = new web3Provider.Contract(
      PAWSWAP_TAX_STRUCTURE_FACTORY[chainId]?.address,
      PAWSWAP_TAX_STRUCTURE_FACTORY[chainId]?.abi,
      web3.getSigner()
    )
    try {
      console.log({ router: PANCAKESWAP_ROUTER[chainId]?.address })
      const taxStructDeploy = await taxStructFactory.deployTaxStructure(
        parseInt(new Date().getTime() / 1000), // pseudo-random number for salt
        PANCAKESWAP_ROUTER[chainId]?.address // default to pancakeswap
      )
      const tx = await taxStructDeploy.wait()
      const event = tx.events.find(event => event.event === 'Deploy');
      const [addr] = event.args
      const newStruct = new web3Provider.Contract(
        addr,
        taxStructureAbi,
        web3.getSigner()
      )
      console.log({ newStruct })
      setListTaxStructContract(newStruct)
    } catch (e) {
      console.log('error deploying tax struct from factory', e)
      return openNotification({
        message: `⚠️ Error deploying tax structure contract!`,
        description: `${e.message} ${e.data?.message}`
      });
    }
  }
  
  const createListing = async () => {
    const web3Provider = Moralis.web3Library;
    const pawswap = new web3Provider.Contract(
      PAWSWAP[chainId]?.address,
      PAWSWAP[chainId]?.abi,
      web3.getSigner()
    )
    try {
      //TESTING
      const existing = await pawswap.tokenTaxContracts(listToken.address)
      console.log({ existing, listing: listToken.address, newTx: listTaxStructContract.address })
      //ENDOFTESTING
      const listingReq = await pawswap.setTokenTaxContract(
        listToken.address,
        listTaxStructContract.address
      )
      openNotification({
        message: `🔊 Listing submitted!`,
        description: `${listingReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + listingReq.hash
      });
      const tx = await listingReq.wait()
      openNotification({
        message: `🎉 Listing complete!`,
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
      return tx
    } catch (e) {
      console.log('error listing token', e)
      return openNotification({
        message: `⚠️ Error listing token!`,
        description: `${e.message} ${e.data?.message}`
      });
    }
  }

  return {
    updateListCurrency,
    updateTaxSetting,
    deployTaxStructure,
    updateTaxStructureByAddress,
    createListing,
    listCurrency,
    listToken,
    listTaxStructContract,
    listTaxStructFeeDecimal,
    listTaxStructTax1Name,
    listTaxStructTax1Address,
    listTaxStructTax1Buy,
    listTaxStructTax1Sell,
    listTaxStructTax2Name,
    listTaxStructTax2Address,
    listTaxStructTax2Buy,
    listTaxStructTax2Sell,
    listTaxStructTax3Name,
    listTaxStructTax3Address,
    listTaxStructTax3Buy,
    listTaxStructTax3Sell,
    listTaxStructTax4Name,
    listTaxStructTax4Address,
    listTaxStructTax4Buy,
    listTaxStructTax4Sell,
    listTaxStructTokenTaxName,
    listTaxStructTokenTaxAddress,
    listTaxStructTokenTaxBuy,
    listTaxStructTokenTaxSell,
    listTaxStructBurnTaxAddress,
    listTaxStructBurnTaxBuy,
    listTaxStructBurnTaxSell,
    listTaxStructLpTokenReceiver,
    listTaxStructLiquidityTaxBuy,
    listTaxStructLiquidityTaxSell,
    listTaxStructCustomTaxName,
    listTaxStructRouterAddress,
  }
}

export default useListingContext