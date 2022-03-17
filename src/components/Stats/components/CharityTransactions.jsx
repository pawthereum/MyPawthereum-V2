import { useMoralis, useMoralisWeb3Api, useMoralisQuery } from "react-moralis";
import { Table, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { networkConfigs } from "helpers/networks";
import { charityWalletAbi } from "constants/abis/charityWallet";
const abiDecoder = require('abi-decoder');

abiDecoder.addABI(charityWalletAbi)

function CharityTransactions(props) {
  const { Moralis, chainId } = useMoralis()

  const table = chainId === '0x38' ? "BscTransactions" : "EthTransactions"

  const isToCharityAddress = new Moralis.Query(table)
  isToCharityAddress.equalTo("to_address", props?.charityWallet?.toLowerCase())

  const isFromCharityAddress = new Moralis.Query(table)
  isFromCharityAddress.equalTo("from_address", props?.charityWallet?.toLowerCase())

  const charityTransactionQuery = new Moralis.Query.or(isToCharityAddress, isFromCharityAddress)

  const [charityTransactions, setCharityTransactions] = useState([])

  useEffect(() => {
    charityTransactionQuery.find()
    .then(results => {
      console.log('resaults', results)
      setCharityTransactions(results.map(r => {
        r.hash = r.attributes?.hash
        r.description = r.attributes?.description || 'No description'
        r.value = r.attributes?.value || 'No value'
        r.link = r.attributes?.link || false
        r.blockTimestamp = r.attributes?.block_timestamp || null
        return r
      }))
    })
  }, [chainId, props.charityWallet])

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
      title: 'Timestamp',
      dataIndex: 'blockTimestamp',
      key: 'timestamp',
      render: (timestamp) => new Date(timestamp).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description, record) => record?.link ? <a href={record.link}>{description}</a> : description,
      onFilter: (value, record) => record?.description.toLowerCase().includes(value.toLowerCase()),
    }
  ]

  return (
    <Table
      dataSource={charityTransactions}
      columns={columns}
      rowKey={(record) => {
        return record.id
      }}
    />
  );
}

export default CharityTransactions