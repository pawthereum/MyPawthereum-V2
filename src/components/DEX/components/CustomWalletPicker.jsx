import React, { useContext, useEffect, useState } from 'react'
import { Space, Input, List, Modal, Button, Popover } from 'antd'
import { QuestionCircleOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined, GlobalOutlined } from '@ant-design/icons';
import { CaretDownOutlined } from "@ant-design/icons";
import AppContext from '../../../AppContext'
import { COLORS } from '../../../constants'
import useGetCustomWallets from 'hooks/useCustomWallets';

const styles = {
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px 5px 5px 5px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  },
  categoryOptions: {
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    marginBottom: '10px', 
    marginTop: '5px' 
  }
}

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
      <div onClick={(e) => {
        e.stopPropagation() // do not select the wallet
        window.open(url, '_blank')
      }}>
        {React.createElement(icon)}
      </div>
    </Space>
  )
};

const PopOverText = ({ stats }) => {
  const statContent = (
    <div style={{ maxWidth: '250px' }}>
      <ul style={{ padding: '10px' }}>
        {stats.map(s => (
          <li>{s}</li>
        ))}
      </ul>
    </div>
  )
  return (
    <Space>
      <Popover title="Donation Impact" content={statContent} trigger="hover">
        Impact <QuestionCircleOutlined />
      </Popover>
    </Space>
  )
}

function CustomWalletPicker () {
  const { 
    updateCustomTaxWallet
  } = useContext(AppContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedWallet, setPickedWallet] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([])
  const [walletOptions, setWalletOptions] = useState(null)
  const [featuredWalletOptions, setFeaturedWalletOptions] = useState(null)

  const showModal = () => {
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
    setPickedWallet(selection)
    handleClose()
  }

  useEffect(() => {
    updateCustomTaxWallet(pickedWallet)
  }, [pickedWallet])

  const onSearchInputChange = (e) => {
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
    if (option.stats) {
      actions.push(<PopOverText stats={option.stats}/>)
    }
    return actions
  }

  const categories = [
    'arts and culture', 'education', 'environment', 'animals', 'healthcare',
    'human services', 'international affairs', 'public benefit', 'religion',
    'mutual benefit', 'unclassified'
  ]

  const toggleCategorySelection = category => {
    if (selectedCategories.includes(category)) {
      return setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
    setSelectedCategories(selectedCategories.concat([category]))
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
        <div style={styles.inset}>
          <Input
            placeholder="Search for a cause"
            onChange={onSearchInputChange} 
            size="large"
            style={{ borderRadius: '1rem' }}
          />

          <div style={{ ...styles.categoryOptions }}>
            {categories.map(category => (
              <Button 
                style={{ marginTop: '5px' }}
                key={category} 
                type={selectedCategories.includes(category) ? 'primary' : ''}
                shape="round" 
                size="small" 
                onClick={() => toggleCategorySelection(category)
              }>
                {category}
              </Button>
            ))}
          </div>
        </div>

        <List
          itemLayout="vertical"
          header={<div>Featured Causes</div>}
          style={{ maxHeight: '500px', overflowY: 'scroll' }}
          dataSource={featuredWalletOptions}
          renderItem={walletOption => (
            <List.Item
              key={walletOption.address}
              style={{ cursor: 'pointer' }}
              onClick={() => pickWallet(walletOption)}
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
                  key={walletOption.address}
                  style={{ cursor: 'pointer' }}
                  onClick={() => pickWallet(walletOption)}
                  
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