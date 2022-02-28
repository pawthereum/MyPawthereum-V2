import Address from "../../Address/Address";
import { FilterOutlined } from "@ant-design/icons";
import { Input, Tabs, Table, Row, Col, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { DECIMALS } from '../../../constants'


function History() {
  const { account, Moralis } = useMoralis();
  
  const isReceiverQuery = new Moralis.Query("Sends")
  isReceiverQuery.equalTo("receiver", account)

  const isSenderQuery = new Moralis.Query("Sends")
  isSenderQuery.equalTo("sender", account)

  const sendsQuery = new Moralis.Query.or(isReceiverQuery, isSenderQuery)
  
  const { data, error, isLoading } = useMoralisQuery(
    "Sends",
    query => sendsQuery,
    [],
    { live: true }
  );
  const [sentRecords, setSentRecords] = useState([])
  const [receivedRecords, setReceivedRecords] = useState([])

  const [filter, setFilter] = useState('')
  const [filteredSentRecords, setFilteredSentRecords] = useState([])
  const [filteredReceivedRecords, setFilteredReceivedRecords] = useState([])

  useEffect(() => {
    if (isLoading) return 
    console.log('data', data)
    setSentRecords(
      data
        .map(d => d.attributes)
        .filter(d => d.sender === account)
        .sort((a, b) => a.block_number < b.block_number ? 1 : -1)
      )
    setReceivedRecords(
      data
        .map(d => d.attributes)
        .filter(d => d.receiver === account)
        .sort((a, b) => a.block_number < b.block_number ? 1 : -1)
    )
    setFilteredSentRecords(sentRecords)
    setFilteredReceivedRecords(receivedRecords)
  }, [data])

  useEffect(() => {
    if (!filter) {
      setFilteredSentRecords(sentRecords)
      setFilteredReceivedRecords(receivedRecords)
      return
    }
    const f = filter.toLowerCase()
    setFilteredSentRecords(sentRecords.filter(r => {
      const matchInAddr = r.receiver.toLowerCase().includes(f)
      const matchInMsg = r.message.toLowerCase().includes(f)
      const matchInAmt = r.amount.toLowerCase().includes(f)
      return matchInAddr && matchInMsg && matchInAmt
    }))
    setFilteredReceivedRecords(receivedRecords.filter(r => {
      const matchInAddr = r.receiver.toLowerCase().includes(f)
      const matchInMsg = r.message.toLowerCase().includes(f)
      const matchInAmt = r.amount.toLowerCase().includes(f)
      return matchInAddr && matchInMsg && matchInAmt
    }))
  }, [filter])

  const receivedColumns = [
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
      render: (sender) => <Address address={sender} size="4" />
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (message) => message
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => Moralis.Units.FromWei(amount, DECIMALS).toLocaleString()
    }
  ]

  const sentColumns = [
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
      render: (receiver) => <Address address={receiver} size="4" />
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (message) => message
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => Moralis.Units.FromWei(amount, DECIMALS).toLocaleString()
    }
  ]

  return (
    <Row gutter={6}>
      <Col span={24}>
        <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
          <Tabs.TabPane tab={<span>Sent</span>} key="1">
            <Input
              size="large"
              value={filter}
              prefix={<FilterOutlined />}
              onChange={(e) => {
                setFilter(`${e.target.value}`);
              }}
              style={{ marginBottom: '5px' }}
            />
            <Skeleton loading={isLoading}>
              <Table
                dataSource={sentRecords}
                columns={sentColumns}
                rowKey={(record) => {
                  return record.transaction_hash;
                }}
              />
            </Skeleton>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<span>Received</span>} key="2">
            <Input
              size="large"
              value={filter}
              prefix={<FilterOutlined />}
              onChange={(e) => {
                setFilter(`${e.target.value}`);
              }}
              style={{ marginBottom: '5px' }}
            />
            <Skeleton loading={isLoading}>
              <Table
                dataSource={receivedRecords}
                columns={receivedColumns}
                rowKey={(record) => {
                  return record.transaction_hash;
                }}
              />
            </Skeleton>
          </Tabs.TabPane>
        </Tabs> 
      </Col>
    </Row>
  );
}

export default History;
