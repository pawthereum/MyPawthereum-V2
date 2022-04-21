import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useERC20Balance } from '../../../hooks/useERC20Balance'
import { AutoComplete, Avatar, Input, List, Modal } from 'antd'
import { CaretDownOutlined } from "@ant-design/icons";
import useSwap from 'hooks/useSwap';

function CurrencyPicker (props) {
  const { tokenList, inputCurrency, outputCurrency, updateInputCurrency, updateOutputCurrency } = useSwap()
  const { assets } = useERC20Balance()
  const { Moralis } = useMoralis()
  const [tokenListWithBalances, setTokenListWithBalances] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedCurrency, setPickedCurrency] = useState(null);

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

  const options = [
    {
      options: tokenListWithBalances.map(t => renderItem(t)),
    },
  ];

  const pickCurrency = (currency) => {
    console.log('picking', currency)
    console.log('token add', tokenList)
    setPickedCurrency(tokenList.find(t => t.address === currency))
    props.side === "input" ? updateInputCurrency(currency) : updateOutputCurrency(currency)
    handleOk()
  }

  const getTokenSymbol = (address) => {
    if (!address) return null
    if (!tokenList) return address
    const token = tokenList?.find(t => t.token_address.toLowerCase() === address)
    return token?.symbol || address
  }

  return (
    <div style={{ cursor: 'pointer', minWidth: '100px' }}>
      <div onClick={showModal} style={{ display: 'flex', alignItems: 'center' }}>
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