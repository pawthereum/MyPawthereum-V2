import { useMoralis } from "react-moralis";
import { ERC20ABI, PAWSEND, PAWTH_ADDRESS, DECIMALS } from '../constants'
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

const usePawSend = (chain) => {
  const { Moralis, account, web3 } = useMoralis();

  async function totalSendTax (params) {
    if (!params || !params.chain) return 0
    const web3Provider = Moralis.web3Library;

    const pawsend = new web3Provider.Contract(
      PAWSEND[params.chain].address,
      PAWSEND[params.chain].abi, 
      web3.getSigner()
    )

    const taxes = await Promise.all([
      pawsend.burnSendTax(),
      pawsend.charitySendTax(),
      pawsend.marketingSendTax(),
      pawsend.stakingSendTax()
    ])

    const totalTax = taxes.reduce((p, c) => p += parseInt(c), 0)

    return totalTax / 100 + '%'
  }

  async function hasAllowance (amount) {
    if (!chain) return false
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      PAWTH_ADDRESS[chain],
      ERC20ABI, 
      web3.getSigner()
    )

    const tokenAllowance = await tokenContract.allowance(
      account,
      PAWSEND[chain].address,
    )

    return parseInt(amount) <= Moralis.Units.FromWei(tokenAllowance, DECIMALS)
  }

  async function updateAllowance (amount) {
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      PAWTH_ADDRESS[chain],
      ERC20ABI, 
      web3.getSigner()
    )

    try {
      const approveReq = await tokenContract.approve(
        PAWSEND[chain].address,
        Moralis.Units.Token(amount, DECIMALS).toString()
      )
      openNotification({
        message: "🔊 Approval Submitted!",
        description: `${approveReq.hash}`,
        link: networkConfigs[chain].blockExplorerUrl + 'tx/' + approveReq.hash
      });
      const tx = await approveReq.wait()
      openNotification({
        message: "🎉 Approval Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chain].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Approval Error!",
        description: `${e.message}`
      });
    }
  }

  async function trySend(params) {
    const { receiver, message, chain } = params;
    console.log('params', params)

    const web3Provider = Moralis.web3Library;

    const pawthereum = new web3Provider.Contract(
      PAWTH_ADDRESS[chain],
      ERC20ABI, 
      web3.getSigner()
    )
    
    const amount = Moralis.Units.Token(params.amount, DECIMALS).toString();

    const pawthereumAllowance = await pawthereum.allowance(
      account,
      PAWSEND[chain].address
    )

    console.log('pawth allowance', pawthereumAllowance)
    console.log('amount', parseInt(amount))

    if (parseInt(pawthereumAllowance) < parseInt(amount)) {
      await pawthereum.approve(
        PAWSEND[chain].address,
        amount
      )
    }

    const pawsend = new web3Provider.Contract(
      PAWSEND[params.chain].address,
      PAWSEND[params.chain].abi, 
      web3.getSigner()
    )

    try {
      const sendReq = await pawsend.pawSend(
        receiver,
        amount,
        message || ''
      )
      openNotification({
        message: '🔊 Transaction Submitted!',
        description: `${sendReq.hash}`,
        link: networkConfigs[params.chain].blockExplorerUrl + 'tx/' + sendReq.hash
      })
      const tx = await sendReq.wait()
      openNotification({
        message: "🎉 Send Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chain].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Send Error!",
        description: `${e.message}`
      });
    }
  }

  return { totalSendTax, trySend, hasAllowance, updateAllowance };
};

export default usePawSend;
