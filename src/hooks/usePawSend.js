import { useMoralis } from "react-moralis";
import { ERC20ABI, PAWSEND, PAWTH_ADDRESS } from '../constants'
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
  const { Moralis, account } = useMoralis();

  async function totalSendTax (params) {
    if (!params || !params.chain) return 0
    const web3Provider = await Moralis.enableWeb3();

    const pawsend = new web3Provider.eth.Contract(
      PAWSEND[params.chain].abi, 
      PAWSEND[params.chain].address
    )

    const taxes = await Promise.all([
      pawsend.methods.burnSendTax().call(),
      pawsend.methods.charitySendTax().call(),
      pawsend.methods.marketingSendTax().call(),
      pawsend.methods.stakingSendTax().call()
    ])

    const totalTax = taxes.reduce((p, c) => p += parseInt(c), 0)

    return totalTax / 100 + '%'
  }

  async function hasAllowance (amount) {
    if (!chain) return false
    const web3Provider = await Moralis.enableWeb3();

    const tokenContract = new web3Provider.eth.Contract(
      ERC20ABI, 
      PAWTH_ADDRESS[chain]
    )

    const tokenAllowance = await tokenContract.methods.allowance(
      account,
      PAWSEND[chain].address,
    ).call()

    const decimals = await tokenContract.methods.decimals().call()

    return parseInt(amount) <= Moralis.Units.FromWei(tokenAllowance, decimals)
  }

  async function updateAllowance (amount) {
    const web3Provider = await Moralis.enableWeb3();

    const tokenContract = new web3Provider.eth.Contract(
      ERC20ABI, 
      PAWTH_ADDRESS[chain]
    )

    console.log('tokenContract is', tokenContract)

    const decimals = await tokenContract.methods.decimals().call()

    await tokenContract.methods.approve(
      PAWSEND[chain].address,
      Moralis.Units.Token(amount, decimals).toString()
    ).send({ from: account })
  }

  async function trySend(params) {
    const { receiver, message, chain } = params;
    console.log('params', params)

    const web3Provider = await Moralis.enableWeb3();

    const pawthereum = new web3Provider.eth.Contract(
      ERC20ABI, 
      PAWTH_ADDRESS[chain]
    )
    console.log('PAWTH_ADDRESS', PAWTH_ADDRESS[chain])

    console.log('pawth', pawthereum)

    const decimals = await pawthereum.methods.decimals().call()

    const amount = Moralis.Units.Token(params.amount, decimals).toString();

    const pawthereumAllowance = await pawthereum.methods.allowance(
      account,
      PAWSEND[chain].address
    ).call()

    console.log('pawth allowance', pawthereumAllowance)
    console.log('amount', parseInt(amount))

    if (parseInt(pawthereumAllowance) < parseInt(amount)) {
      await pawthereum.methods.approve(
        PAWSEND[chain].address,
        amount
      ).send({ from: account })
    }

    await doSend({ chain, amount, receiver, message })
      .then((receipt) => {
        if (receipt.statusCode !== 400) {
          const link = networkConfigs[params.chain].blockExplorerUrl + 'tx/' + receipt.transactionHash
          openNotification({
            message: "🎉 Send Complete!",
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

  async function doSend(params) {
    const web3Provider = await Moralis.enableWeb3();

    const pawsend = new web3Provider.eth.Contract(
      PAWSEND[params.chain].abi, 
      PAWSEND[params.chain].address
    )

    console.log('pawsend', pawsend)

    return await pawsend.methods.pawSend(
      params.receiver,
      params.amount,
      params.message || ''
    ).send({ 
      from: account
    }).on('transactionHash', hash => openNotification({
      message: '🔊 Transaction Submitted!',
      description: `${hash}`,
      link: networkConfigs[params.chain].blockExplorerUrl + 'tx/' + hash
    }))
  }

  return { totalSendTax, trySend, hasAllowance, updateAllowance };
};

export default usePawSend;
