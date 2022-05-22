import React, { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Space, Avatar, Input, List, Modal, Button } from 'antd'
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, GlobalOutlined } from '@ant-design/icons';
import { CaretDownOutlined } from "@ant-design/icons";
import AppContext from '../../../AppContext'
import { networkConfigs } from 'helpers/networks';
import useGetCustomWallets from 'hooks/useCustomWallets';

const IconText = ({ icon, text, link }) => {
  let url
  switch (text) {
    case 'website':
      console.log('websit...')
      url = 'https://' + link
      break
    case 'twitter':
      url = 'https://twitter.com/' + link
      break
    case 'facebook':
      url = 'https://facebook.com/' + link
      break
    case 'instagram':
      url = 'https://instagram.com/' + link
      break
    default:
      url = link
  }
  return (
    <Space>
      <div onClick={() => window.open(url, '_blank')}>
        {React.createElement(icon)}
      </div>
    </Space>
  )
};

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

  const getWalletOptionActions = option => {
    const actions = []
    if (option.website) {
      actions.push(<IconText icon={GlobalOutlined} text="website" link={option.website} />)
    }
    if (option.twitter) {
      actions.push(<IconText icon={TwitterOutlined} text="twitter" link={option.twitter} />)
    }
    if (option.instagram) {
      actions.push(<IconText icon={InstagramOutlined} text="instagram" link={option.instagram} />)
    }
    if (option.facebook) {
      actions.push(<IconText icon={FacebookOutlined} text="facebook" link={option.facebook} />)
    }
    return actions
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
          itemLayout="vertical"
          header={<div>Featured Causes</div>}
          style={{ maxHeight: '500px', overflowY: 'scroll' }}
          dataSource={featuredWalletOptions}
          renderItem={walletOption => (
            <List.Item
              style={{ cursor: 'pointer' }}
              // onClick={() => pickWallet(walletOption.address)}
              actions={getWalletOptionActions(walletOption)}
              extra={
                <img
                  width={100}
                  alt="logo"
                  src={walletOption.logo}
                />
              }
            >
              <List.Item.Meta
                // avatar={<Avatar src={walletOption.icon} />}
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
            itemLayout="vertical"
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
                // onClick={() => pickWallet(walletOption.address)}
                
                actions={getWalletOptionActions(walletOption)}

                extra={!walletOption.logo ? '' :
                  <img
                    width={100}
                    alt="logo"
                    src={walletOption.logo}
                  />
                }
              >
                <List.Item.Meta
                  // avatar={<Avatar src={walletOption.icon} />}
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