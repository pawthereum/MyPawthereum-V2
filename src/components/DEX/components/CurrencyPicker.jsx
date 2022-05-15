import { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useERC20Balance } from '../../../hooks/useERC20Balance'
import { AutoComplete, Avatar, Input, List, Modal, Button } from 'antd'
import { CaretDownOutlined } from "@ant-design/icons";
import AppContext from '../../../AppContext'
import useNative from 'hooks/useNative';
import { networkConfigs } from 'helpers/networks';

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
  const { Moralis, chainId, account } = useMoralis()
  const { isNative, getNativeBalance } = useNative()
  const [tokenListWithBalances, setTokenListWithBalances] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedCurrency, setPickedCurrency] = useState(null);
  const [nativeCurrency, setNativeCurrency] = useState(null);
  const [omittedSelectionAddresses, setOmittedSelectionAddresses] = useState([])
  const [options, setOptions] = useState([])

  const setTokenBalances = async () => {
    const tList = await Promise.all(tokenList.map(async(t) => {
      let balance
      if (isNative(t.address)) {
        balance = await getNativeBalance()
        balance = !balance ? '0' : Moralis.Units.FromWei(balance, 18)
      } else if (!assets) {
        t.userBalance = '0'
      } else {
        const asset = assets.find(a => a.token_address === t.address.toLowerCase())
        balance = Moralis.Units.FromWei(asset?.balance || '0', asset?.decimals || '18')
      }
      t.userBalance = balance || '0'
      return t
    }))
    console.log(tList)
    setTokenListWithBalances(tList)
  }

  useEffect(() => {
    if (!account || !chainId) return
    if (!tokenList) return
    if (!assets) {
      console.log('~~~~~~~~~ no assets, ', tokenList)
    }
    // if (!assets) return setTokenListWithBalances(tokenList)
    console.log('hello')
    setTokenBalances()
  }, [tokenList, assets, chainId, account])

  const showModal = () => {
    console.log('showing')
    setIsModalVisible(true);
  };

  const handleClose = () => {
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
          {Number(token.userBalance).toLocaleString([], {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })}
        </span>
      </div>
    ),
  });

  useEffect(() => {
    if (props.side === 'input' && inputCurrency) {
      if (inputCurrency?.address.toLowerCase() === outputCurrency?.address.toLowerCase()) {
        updateOutputCurrency(null)
      }
      if (!isNative(inputCurrency.address) && nativeCurrency) {
        updateOutputCurrency(nativeCurrency)
      }
      setPickedCurrency(inputCurrency)
    }
    if (props.side === 'output' && outputCurrency) {
      // clear the other input if same token selected
      if (inputCurrency?.address.toLowerCase() === outputCurrency?.address.toLowerCase()) {
        updateInputCurrency(null)
      }
      setPickedCurrency(outputCurrency)
      if (!isNative(outputCurrency.address) && nativeCurrency) {
        updateInputCurrency(nativeCurrency)
      }
    }

  }, [props.side, estimatedSide, inputCurrency, outputCurrency])

  useEffect(() => {
    if (tokenListWithBalances) {
      const nativeCurrency = tokenListWithBalances.find(t => t.isNative)
      if (nativeCurrency) {
        nativeCurrency.address = networkConfigs[chainId]?.wrapped
        setNativeCurrency(nativeCurrency)
      }
    }
    setOptions([
      {
        options: tokenListWithBalances
          .filter(t => !omittedSelectionAddresses.includes(t?.address?.toLowerCase()))
          .map(t => renderItem(t)),
      }
    ])
  }, [tokenListWithBalances, omittedSelectionAddresses])


  const pickCurrency = (currency) => {
    const selection = tokenList.find(t => t.address === currency)
    if (isNative(selection.address)) {
      selection.address = networkConfigs[chainId]?.wrapped
    }
    console.log('selection', selection)
    setPickedCurrency(selection)
    props.side === "input" ? updateInputCurrency(selection) : updateOutputCurrency(selection)
    handleClose()
  }

  return (
    <div style={{ 
      cursor: 'pointer',
      background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))',
      boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
      borderRadius: '24px',
    }}>
      <Button type="text" onClick={showModal} style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center' }}>
        { pickedCurrency ? <img src={pickedCurrency.logoURI} width="20px" /> : <></> } 
        <span style={{ marginLeft: '5px'}}>{
          pickedCurrency?.symbol || 'Select a token'
        }</span> <CaretDownOutlined />
      </Button>
      <Modal title="Select a token" visible={isModalVisible} footer={null} onCancel={handleClose}>
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
          dataSource={tokenListWithBalances.filter(t => !omittedSelectionAddresses.includes(t?.address?.toLowerCase()))}
          renderItem={token => (
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => pickCurrency(token.address)}
              actions={[<span>{Number(token.userBalance).toLocaleString([], {
                maximumFractionDigits: 4,
                minimumFractionDigits: 0
              })}</span>]}
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