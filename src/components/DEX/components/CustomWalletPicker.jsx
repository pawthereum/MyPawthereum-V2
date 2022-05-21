import { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { AutoComplete, Avatar, Input, List, Modal, Button } from 'antd'
import { CaretDownOutlined } from "@ant-design/icons";
import AppContext from '../../../AppContext'
import { networkConfigs } from 'helpers/networks';
import useGetCustomWallets from 'hooks/useCustomWallets';

function CustomWalletPicker (props) {
  const { 
    updateCustomTaxWallet
  } = useContext(AppContext)
  const { Moralis, chainId, account } = useMoralis()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedWallet, setPickedWallet] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null)
  const [walletOptions, setWalletOptions] = useState(null)
  const [featuredWalletOptions, setFeaturedWalletOptions] = useState(null)

  const showModal = () => {
    console.log('showing')
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const apiResp = useGetCustomWallets(searchTerm, selectedCategories)

  useEffect(() => {
    if (!apiResp) return
    console.log({ apiResp })
    setWalletOptions(apiResp.filter(o => !o.isFeatured))
    setFeaturedWalletOptions(apiResp.filter(o => o.isFeatured))
  }, [apiResp])

  const pickWallet = (wallet) => {
    const selection = walletOptions.find(o => o.address.toLowerCase() === wallet.address.toLowerCase())
    console.log('selection', selection)
    setPickedWallet(selection)
    handleClose()
  }

  useEffect(() => {
    updateCustomTaxWallet(pickedWallet)
  }, [pickedWallet])

  const onSearchInputChange = (e) => {
    console.log({ e: e.target.value })
    setSearchTerm(e.target.value)
  }

  return (
    <div style={{ 
      cursor: 'pointer',
      background: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))',
      boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
      borderRadius: '24px',
    }}>
      <Button type="text" onClick={showModal} style={{ display: 'flex',  alignItems: 'center', justifyContent: 'center' }}>
        { pickedWallet ? <img src={pickedWallet.logoURI} width="20px" /> : <></> } 
        <span style={{ marginLeft: '5px'}}>{
          pickedWallet?.symbol || 'Select a cause'
        }</span> <CaretDownOutlined />
      </Button>
      <Modal 
        title="Select a cause" 
        visible={isModalVisible} 
        footer={null} 
        onCancel={handleClose}
      >
        <Input onChange={onSearchInputChange} />
        <List
          itemLayout="horizontal"
          header={<div>Featured Causes</div>}
          style={{ maxHeight: '500px', overflowY: 'scroll' }}
          dataSource={featuredWalletOptions}
          renderItem={walletOption => (
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => pickWallet(walletOption.address)}
            >
              <List.Item.Meta
                avatar={<Avatar src={walletOption.logo} />}
                title={<span>{walletOption.name}</span>}
                description={<span>{walletOption.mission}</span>}
              />
            </List.Item>
          )}
        />
        {
          !walletOptions || walletOptions.length === 0 ? '' :
          <>
            <div style={{ 
              paddingTop: '12px',
              paddingBottom: '12px'
            }}>Search Results</div>
            <List
            itemLayout="horizontal"
            style={{ 
              maxHeight: '500px', 
              overflowY: 'scroll',
              boxShadow: 'rgb(74 74 104 / 10%) 0px 1px 0px 0px inset'
              // borderRadius: '1rem'
            }}
            dataSource={walletOptions}
            renderItem={walletOption => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => pickWallet(walletOption.address)}
              >
                <List.Item.Meta
                  avatar={<Avatar src={walletOption.logo} />}
                  title={<span>{walletOption.name}</span>}
                  description={<span>{walletOption.mission}</span>}
                />
              </List.Item>
            )}
          />
          </>
        }
      </Modal>
    </div>
  )
}

export default CustomWalletPicker;