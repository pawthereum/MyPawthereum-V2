import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Table, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { networkConfigs } from "helpers/networks";
import { charityWalletAbi } from "constants/abis/charityWallet";
import { getFirestore, doc, getDoc, Timestamp } from 'firebase/firestore'
const abiDecoder = require('abi-decoder');

abiDecoder.addABI(charityWalletAbi)

function CharityTransactions(props) {
  const { Moralis } = useMoralis()
  const [charityTransactions, setCharityTransactions] = useState([])

  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    if (!props.chainId || !props.charityWallet) return
    fetchTransactions()

    async function fetchTransactions () {
      const db = getFirestore()
      const docRef = doc(db, 'pawthereum', 'transactions')
      const docSnap = await getDoc(docRef)
      let transactionDescriptions = []
      if (docSnap.exists()) {
        transactionDescriptions = docSnap.data().charity || []
      }
      console.log('transactionDescriptions', transactionDescriptions)

      const options = {
        chain: props.chainId,
        address: props.charityWallet,
        order: "desc",
        from_block: "0",
      };
      const transactionQuery = await Web3Api.account.getTransactions(options);
      const transactions = transactionQuery.result.map(t => {
        t.description = transactionDescriptions[t.hash] || 'Unknown'
        const decodedTx = abiDecoder.decodeMethod(t.input)
        if (!decodedTx) return t
        const value = decodedTx.params.find(p => p.name === 'value')
        if (!value) return t
        t.ethTransferred = Moralis.Units.FromWei(value.value)
        return t
      })
      setCharityTransactions(transactions)
    }
  }, [props])

  if (charityTransactions.length === 0) return ( <Skeleton></Skeleton> )

  const columns = [
    {
      title: 'Tx',
      dataIndex: 'hash',
      key: 'tx',
      render: (tx) => {
        if (!tx) return null
        return (
          <a href={networkConfigs[props.chainId].blockExplorerUrl + 'tx/' + tx}>
            {tx.substring(0,4) + '...' + tx.substring(tx.length - 4, tx.length)}
          </a>
        )
      }
    },
    {
      title: 'ETH',
      dataIndex: 'ethTransferred',
      key: 'ethTransferred',
      render: (value) => value.toLocaleString([], { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
      sorter: (a, b) => a - b,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => description,
      onFilter: (value, record) => record.description.toLowerCase().includes(value),
    }
  ]

  return (
    <Table
      dataSource={charityTransactions}
      columns={columns}
      rowKey={(record) => {
        return record.hash
      }}
    />
  );
}

export default CharityTransactions