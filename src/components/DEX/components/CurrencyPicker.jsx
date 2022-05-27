import { useContext, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useERC20Balance } from '../../../hooks/useERC20Balance'
import { AutoComplete, Avatar, Input, List, Modal, Button, Tag, Skeleton, Result } from 'antd'
import { CaretDownOutlined } from "@ant-design/icons";
import AppContext from '../../../AppContext'
import useNative from 'hooks/useNative';
import { networkConfigs } from 'helpers/networks';
import { COLORS } from '../../../constants'
import useSearchToken from 'hooks/useTokenSearch';
import paws from '../../../assets/images/paws.png'

function CurrencyPicker (props) {
  const { 
    tokenList, 
    updateInputCurrency, 
    updateOutputCurrency,
    listCurrency,
    updateListCurrency,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [tokenSearchResult, setTokenSearchResult] = useState(null)

  const MIN_ADDR_LENGTH = 42

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
    if (props.side === 'list' && listCurrency) {
      console.log('~~~~~~~~~~~~~~')
      console.log({ listCurrency })
      updateListCurrency(listCurrency)
    }
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

  }, [props.side, estimatedSide, inputCurrency, outputCurrency, listCurrency])

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
    console.log({currency, tokenList})
    const selection = tokenList.find(t => t.address.toLowerCase() === currency.toLowerCase())
    if (isNative(selection.address)) {
      selection.address = networkConfigs[chainId]?.wrapped
    }
    console.log('selection', selection)
    setPickedCurrency(selection)
    switch(props.side) {
      case 'input':
        updateInputCurrency(selection)
        break
      case 'output':
        updateOutputCurrency(selection)
        break
      case 'list':
        updateListCurrency(selection)
        break
      default:
        console.log('unhandled currency selection')
    }
    // props.side === "input" ? updateInputCurrency(selection) : updateOutputCurrency(selection)
    handleClose()
  }

  const onSearchInputChange = (e) => {
    setTokenSearchResult(null)
    setSearchTerm(e.target.value)
  }

  const tokenData = useSearchToken(searchTerm)

  useEffect(() => {
    console.log('resultssssss', tokenData)
    if (!tokenData) return
    setTokenSearchResult(tokenData)
  }, [tokenData])

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
        <div style={{ paddingBottom: '12px' }}>
          <Input
            placeholder="Search for a token"
            onChange={onSearchInputChange} 
            size="large"
            style={{ borderRadius: '1rem' }}
          />
        </div>
        {
          !tokenSearchResult?.error ? '' :
          <Result
            icon={<div style={{display: 'flex', justifyContent: 'center'}}><img src={paws} height="100px"/></div>}
            title="We couldn't find a token with that address"
            subtitle="Try searching for another token"
            extra={
              <span>
                Try searching for a different address and ensure you're connected with the correct chain.
              </span>
            }
          />
        }
        {
          // Loading state for search results
          !tokenSearchResult && !tokenSearchResult?.error && searchTerm.length === MIN_ADDR_LENGTH ?
          <>
            <div style={{ 
              paddingTop: '12px',
              paddingBottom: '12px'
            }}>Search Results</div>
            <Skeleton />
          </> : ''
        }
        {
          !tokenSearchResult || tokenSearchResult?.error ? '' :
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
              dataSource={[tokenSearchResult]}
              renderItem={token => (
                <List.Item
                  key={token?.address}
                  style={{ cursor: token.isListed ? 'pointer' : '' }}
                  onClick={() => token.isListed ? pickCurrency(token.address) : ''}
                  actions={[<span>{Number(token?.userBalance).toLocaleString([], {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 0
                  })}</span>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={token?.logoURI} />}
                    title={
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                        {token?.name}
                        {
                          token.isListed ? '' : 
                          <Tag style={{marginLeft: '5px'}} color="processing">Not listed</Tag>
                        }
                      </div>}
                    description={<span>{token.symbol}</span>}
                    // description={<span>{token?.coinGeckoTokenData?.description?.en}</span>}
                  />
                </List.Item>
              )}
            />
          </>
        }
        {
          props.hideFeatured ? '' :
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
        }
      </Modal>
    </div>
  )
}

export default CurrencyPicker;