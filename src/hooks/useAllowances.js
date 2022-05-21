import { useMoralis } from 'react-moralis'
import { ERC20ABI } from '../constants'
import { networkConfigs } from 'helpers/networks';
import { notification } from 'antd'

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

const useAllowances = () => {
  const { Moralis, account, web3, chainId } = useMoralis(); 

  async function hasAllowance (params) {
    if (!chainId) return false
    const { amount, spender, token } = params
    
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      token.address,
      ERC20ABI,
      web3.getSigner()
    )

    const tokenAllowance = await tokenContract.allowance(
      account,
      spender,
    )

    return Number(amount) <= Moralis.Units.FromWei(tokenAllowance, token.decimals)
  }

  async function updateAllowance (params) {
    const { amount, spender, token } = params
    const web3Provider = Moralis.web3Library;

    const tokenContract = new web3Provider.Contract(
      token.address,
      ERC20ABI, 
      web3.getSigner()
    )

    try {
      console.log('amount', amount)
      console.log(amount.raw)
      const approveReq = await tokenContract.approve(
        spender,
        Moralis.Units.Token(amount.raw, token?.decimals)
      )
      openNotification({
        message: "🔊 Approval Submitted!",
        description: `${approveReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + approveReq.hash
      });
      const tx = await approveReq.wait()
      openNotification({
        message: "🎉 Approval Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Approval Error!",
        description: `${e.message}`
      });
    }
  }

  return {
    hasAllowance,
    updateAllowance
  }
}

export default useAllowances;