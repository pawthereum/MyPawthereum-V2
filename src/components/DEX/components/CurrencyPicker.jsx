import { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useERC20Balance } from '../../../hooks/useERC20Balance'
import { AutoComplete, Avatar, Input, List, Modal } from 'antd'
import { CaretDownOutlined } from "@ant-design/icons";
import AppContext from '../../../AppContext'

function CurrencyPicker (props) {
  const { 
    tokenList, 
    updateInputCurrency, 
    updateOutputCurrency,
    inputCurrency,
    outputCurrency,
    estimatedSide
  } = useContext(AppContext)
  const { assets } = useERC20Balance()
  const { Moralis } = useMoralis()
  const [tokenListWithBalances, setTokenListWithBalances] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedCurrency, setPickedCurrency] = useState(null);
  const [omittedSelectionAddresses, setOmittedSelectionAddresses] = useState([])

  useEffect(() => {
    if (!tokenList) return
    if (!assets) return setTokenListWithBalances(tokenList)
    setTokenListWithBalances(tokenList.map(t => {
      const asset = assets.find(a => a.token_address === t.address.toLowerCase())
      const balance = Moralis.Units.FromWei(asset?.balance || '0', asset?.decimals || '18')
      t.userBalance = balance || '0'
      return t
    }))
  }, [tokenList, assets])

  const showModal = () => {
    console.log('showing')
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('handling')
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log('canceling')
    setIsModalVisible(false);
  };

  const renderItem = (token) => ({
    value: token.address,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={token.logoURI} width="25px"/>
          <span style={{ marginLeft: '5px' }}>{token.name}</span>
        </div>
        
        <span>
          {parseFloat(token.userBalance).toLocaleString([], {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })}
        </span>
      </div>
    ),
  });

  useEffect(() => {
    if (props.side === 'input' && inputCurrency) {
      setPickedCurrency(inputCurrency)
      setOmittedSelectionAddresses([inputCurrency?.address.toLowerCase()])
    } 
    if (props.side === 'output' && outputCurrency) {
      setPickedCurrency(outputCurrency)
      setOmittedSelectionAddresses([outputCurrency?.address.toLowerCase()])
    }

    console.log(omittedSelectionAddresses)

  }, [props.side, estimatedSide, inputCurrency, outputCurrency])

  const options = [
    {
      options: tokenListWithBalances
        .filter(t => !omittedSelectionAddresses.includes(t.address.toLowerCase()))
        .map(t => renderItem(t)),
    },
  ];

  const pickCurrency = (currency) => {
    const selection = tokenList.find(t => t.address === currency)
    setPickedCurrency(selection)
    props.side === "input" ? updateInputCurrency(selection) : updateOutputCurrency(selection)
    handleOk()
  }

  return (
    <div style={{ 
      cursor: 'pointer',
      minWidth: '150px', 
      background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
      borderRadius: '24px',
      padding: '5px'
    }}>
      <div onClick={showModal} style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center' }}>
        { pickedCurrency ? <img src={pickedCurrency.logoURI} width="20px" /> : <></> } 
        <span style={{ marginLeft: '5px'}}>{
          pickedCurrency?.symbol || 'Select a token'
        }</span> <CaretDownOutlined />
      </div>
      <Modal title="Select a token" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={500}
          style={{ width: '100%' }}
          options={options}
          onSelect={pickCurrency}
        >
          <Input.Search size="large" placeholder="Search name or paste address" />
        </AutoComplete>
        <List
          itemLayout="horizontal"
          header={<div>Featured Tokens</div>}
          dataSource={tokenListWithBalances}
          renderItem={token => (
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => pickCurrency(token.address)}
              actions={[<span>{token.userBalance}</span>]}
            >
              <List.Item.Meta
                avatar={<Avatar src={token.logoURI} />}
                title={<span>{token.name}</span>}
                description={<span>{token.symbol}</span>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}

export default CurrencyPicker;