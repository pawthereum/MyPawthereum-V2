
import { useState, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import AppContext from 'AppContext'
import { Alert, Badge, Divider, Row, Col, Space, Collapse, Input, Tag, Button, Popover } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import useNative from 'hooks/useNative';
import { COLORS, PANCAKESWAP_ROUTER, PAWSWAP_ROUTER } from '../../../../constants';
import CurrencyPicker from '../../components/CurrencyPicker'


const { Panel } = Collapse;
const DEFAULT_BURN_ADDRESS = '0x000000000000000000000000000000000000dEaD'

const styles = {
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  },
  button: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
    width: "100%",
    borderRadius: "0.6rem",
    height: "50px"
  }
}

function TaxManagementForm (props) {
  const { 
    updateTaxSetting,
    listTaxStructFeeDecimal,
    // native taxes
    listTaxStructTax1Name,
    listTaxStructTax1Address,
    listTaxStructTax1Buy,
    listTaxStructTax1Sell,
    listTaxStructTax2Name,
    listTaxStructTax2Address,
    listTaxStructTax2Buy,
    listTaxStructTax2Sell,
    listTaxStructTax3Name,
    listTaxStructTax3Address,
    listTaxStructTax3Buy,
    listTaxStructTax3Sell,
    listTaxStructTax4Name,
    listTaxStructTax4Address,
    listTaxStructTax4Buy,
    listTaxStructTax4Sell,
    // token taxes
    listTaxStructTokenTaxName,
    listTaxStructTokenTaxAddress,
    listTaxStructTokenTaxBuy,
    listTaxStructTokenTaxSell,
    listTaxStructBurnTaxAddress,
    listTaxStructBurnTaxBuy,
    listTaxStructBurnTaxSell,
    listTaxStructLpTokenReceiver,
    listTaxStructLiquidityTaxBuy,
    listTaxStructLiquidityTaxSell,
    listTaxStructCustomTaxName,
    // router
    listTaxStructRouterAddress,
  } = useContext(AppContext)
  const { nativeSymbol } = useNative()
  const { chainId } = useMoralis()

  const [updateLoading, setUpdateLoading] = useState(false)

  // native taxes
  const [tax1Name, setTax1Name] = useState(null)
  const [tax1Buy, setTax1Buy] = useState(null)
  const [tax1Sell, setTax1Sell] = useState(null)
  const [tax1Address, setTax1Address] = useState(null)
  const [tax2Name, setTax2Name] = useState(null)
  const [tax2Buy, setTax2Buy] = useState(null)
  const [tax2Sell, setTax2Sell] = useState(null)
  const [tax2Address, setTax2Address] = useState(null)
  const [tax3Name, setTax3Name] = useState(null)
  const [tax3Buy, setTax3Buy] = useState(null)
  const [tax3Sell, setTax3Sell] = useState(null)
  const [tax3Address, setTax3Address] = useState(null)
  const [tax4Name, setTax4Name] = useState(null)
  const [tax4Buy, setTax4Buy] = useState(null)
  const [tax4Sell, setTax4Sell] = useState(null)
  const [tax4Address, setTax4Address] = useState(null)
  const [customTaxName, setCustomTaxName] = useState(null)

  // token taxes
  const [tokenTaxName, setTokenTaxName] = useState(null)
  const [tokenTaxAddress, setTokenTaxAddresss] = useState(null)
  const [tokenTaxBuy, setTokenTaxBuy] = useState(null)
  const [tokenTaxSell, setTokenTaxSell] = useState(null)
  const [burnTaxAddress, setBurnTaxAddress] = useState(DEFAULT_BURN_ADDRESS)
  const [burnTaxBuy, setBurnTaxBuy] = useState(null)
  const [burnTaxSell, setBurnTaxSell] = useState(null)
  const [liquidityTaxAddress, setLiquidityTaxAddress] = useState(null)
  const [liquidityTaxBuy, setLiquidityTaxBuy] = useState(null)
  const [liquidityTaxSell, setLiquidityTaxSell] = useState(null)

  // router
  const [routerAddress, setRouterAddress] = useState(null)

  const formatTaxForViewing = (tax) => {
    if (!tax) return null
    return Number(tax.toString()) / 10**listTaxStructFeeDecimal
  }

  const nativeTaxes = [
    { 
      name: tax1Name || listTaxStructTax1Name || 'Tax 1', 
      storedName: listTaxStructTax1Name,
      setName: setTax1Name, 
      setBuy: setTax1Buy, 
      setSell: setTax1Sell, 
      isTax1: true,
      buy: tax1Buy !== null ? tax1Buy : formatTaxForViewing(listTaxStructTax1Buy), 
      storedBuy: formatTaxForViewing(listTaxStructTax1Buy),
      sell: tax1Sell !== null ? tax1Sell : formatTaxForViewing(listTaxStructTax1Sell), 
      storedSell: formatTaxForViewing(listTaxStructTax1Sell),
      address: tax1Address || listTaxStructTax1Address,
      storedAddress: listTaxStructTax1Address,
      setAddress: setTax1Address
    },
    { 
      name: tax2Name || listTaxStructTax2Name || 'Tax 2', 
      storedName: listTaxStructTax2Name,
      setName: setTax2Name, 
      setBuy: setTax2Buy, 
      setSell: setTax2Sell, 
      isTax2: true,
      buy: tax2Buy !== null ? tax2Buy : formatTaxForViewing(listTaxStructTax2Buy), 
      storedBuy: formatTaxForViewing(listTaxStructTax2Buy),
      sell: tax2Sell !== null ? tax2Sell : formatTaxForViewing(listTaxStructTax2Sell), 
      storedSell: formatTaxForViewing(listTaxStructTax2Sell),
      address: tax2Address || listTaxStructTax2Address,
      storedAddress: listTaxStructTax2Address,
      setAddress: setTax2Address 
    },
    { 
      name: tax3Name || listTaxStructTax3Name || 'Tax 3', 
      storedName: listTaxStructTax3Name,
      setName: setTax3Name, 
      setBuy: setTax3Buy, 
      setSell: setTax3Sell, 
      isTax3: true,
      buy: tax3Buy !== null ? tax3Buy : formatTaxForViewing(listTaxStructTax3Buy), 
      storedBuy: formatTaxForViewing(listTaxStructTax3Buy),
      sell: tax3Sell !== null ? tax3Sell : formatTaxForViewing(listTaxStructTax3Sell), 
      storedSell: formatTaxForViewing(listTaxStructTax3Sell),
      address: tax3Address || listTaxStructTax3Address, 
      storedAddress: listTaxStructTax3Address,
      setAddress: setTax3Address 
    },
    { 
      name: tax4Name || listTaxStructTax4Name || 'Tax 4', 
      storedName: listTaxStructTax4Name,
      setName: setTax4Name, 
      setBuy: setTax4Buy, 
      setSell: setTax4Sell, 
      isTax4: true,
      buy: tax4Buy !== null ? tax4Buy : formatTaxForViewing(listTaxStructTax4Buy), 
      storedBuy: formatTaxForViewing(listTaxStructTax4Buy),
      sell: tax4Sell !== null ? tax4Sell : formatTaxForViewing(listTaxStructTax4Sell), 
      storedSell: formatTaxForViewing(listTaxStructTax4Sell),
      address: tax4Address || listTaxStructTax4Address, 
      storedAddress: listTaxStructTax4Address,
      setAddress: setTax4Address 
    },
  ]

  const customTax = { 
    name: customTaxName || listTaxStructCustomTaxName || 'Custom Tax', 
    storedName: listTaxStructCustomTaxName,
    setName: setCustomTaxName, 
    setBuy: ()=>{}, 
    setSell: ()=>{}, 
    isCustom: true,
    buy: null, 
    storedBuy: null,
    sell: null, 
    storedSell: null,
    address: null,
    storedAddress: null,
    setAddress: ()=>{} 
  }

  const tokenTaxes = [
    { 
      name: tokenTaxName || listTaxStructTokenTaxName || 'Token Tax', 
      storedName: listTaxStructTokenTaxName,
      setName: setTokenTaxName, 
      isTokenTax: true,
      address: tokenTaxAddress || listTaxStructTokenTaxAddress, 
      storedAddress: listTaxStructTokenTaxAddress,
      setAddress: setTokenTaxAddresss, 
      setBuy: setTokenTaxBuy, 
      setSell: setTokenTaxSell, 
      buy: tokenTaxBuy !== null ? tokenTaxBuy : formatTaxForViewing(listTaxStructTokenTaxBuy), 
      storedBuy: formatTaxForViewing(listTaxStructTokenTaxBuy),
      sell: tokenTaxSell !== null ? tokenTaxSell : formatTaxForViewing(listTaxStructTokenTaxSell),
      storedSell: formatTaxForViewing(listTaxStructTokenTaxSell)
    },
    { 
      name: 'Burn Tax',
      storedName: 'Burn Tax',
      isBurn: true,
      address: burnTaxAddress || listTaxStructBurnTaxAddress, 
      storedAddress: listTaxStructBurnTaxAddress,
      setAddress: setBurnTaxAddress, 
      setBuy: setBurnTaxBuy, 
      setSell: setBurnTaxSell, 
      buy: burnTaxBuy !== null ? burnTaxBuy : formatTaxForViewing(listTaxStructBurnTaxBuy), 
      storedBuy: formatTaxForViewing(listTaxStructBurnTaxBuy),
      sell: burnTaxSell !== null ? burnTaxSell : formatTaxForViewing(listTaxStructBurnTaxSell),
      storedSell: formatTaxForViewing(listTaxStructBurnTaxSell),
    },
  ]

  const liquidityTax =  { 
    name: 'Liquidity Tax', 
    storedName: 'Liquidity Tax',
    isLiquidity: true,
    address: liquidityTaxAddress || listTaxStructLpTokenReceiver, 
    storedAddress: listTaxStructLpTokenReceiver,
    setAddress: setLiquidityTaxAddress, 
    setBuy: setLiquidityTaxBuy, 
    setSell: setLiquidityTaxSell, 
    buy: liquidityTaxBuy !== null ? liquidityTaxBuy : formatTaxForViewing(listTaxStructLiquidityTaxBuy), 
    storedBuy: formatTaxForViewing(listTaxStructLiquidityTaxBuy),
    sell: liquidityTaxSell !== null ? liquidityTaxSell : formatTaxForViewing(listTaxStructLiquidityTaxSell),
    storedSell: formatTaxForViewing(listTaxStructLiquidityTaxSell),
  }

  const router = {
    name: 'Swap with LP', 
    storedName: 'Swap with LP',
    setName: ()=>{}, 
    setBuy: ()=>{}, 
    setSell: ()=>{}, 
    isRouter: true,
    buy: null, 
    storedBuy: null,
    sell: null, 
    storedSell: null,
    address: routerAddress || listTaxStructRouterAddress,
    storedAddress: listTaxStructRouterAddress,
    setAddress: setRouterAddress
  }

  const onNameInputChange = (e, tax) => {
    tax.setName(e.target.value)
  }

  const onAddressInputChange = (e, tax) => {
    tax.setAddress(e.target.value)
  }

  const onBuyInputChange = (e, tax) => {
    tax.setBuy(e.target.value)
  }

  const onSellInputChange = (e, tax) => {
    tax.setSell(e.target.value)
  }

  const truncateAddress = (addr) => {
    const MIN_ADDR_LENGTH = 42
    if (!addr || addr.length !== MIN_ADDR_LENGTH) return null
    return addr.slice(0, 5) + '...' + addr.substring(addr.length - 4)
  }

  const notDefaultName = (name) => 
    name !== 'Tax 1' &&
    name !== 'Tax 2' &&
    name !== 'Tax 3' &&
    name !== 'Tax 4' &&
    name !== 'Token Tax' &&
    name !== 'Burn Tax'

  const showUpdateButton = (tax) => {
    if (!listTaxStructFeeDecimal) return false
    if (tax.name !== tax.storedName && notDefaultName(tax.name)) return true
    if (tax.buy?.toString() !== tax.storedBuy?.toString()) return true
    if (tax.sell?.toString() !== tax.storedSell?.toString()) return true
    if (tax.address !== tax.storedAddress) return true
    return false
  }

  const PanelHeader = (props) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>
        <Badge dot={showUpdateButton(props.tax)} offset={[5, 0]}>
          {props.tax.name}
        </Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { Number(props.tax.buy) ? <Tag color="success">{props.tax.buy}%</Tag> : '' }
        { Number(props.tax.sell) ? <Tag color="error">{props.tax.sell}%</Tag> : '' }
        { !Number(props.tax.buy) && !Number(props.tax.sell) ? <Tag>disabled</Tag> : '' }
      </div>
    </div>  
  )

  const getRouterName = (address) => {
    if (!address) return 'Swap'
    if (
      PAWSWAP_ROUTER[chainId]?.address.toLowerCase() === address.toLowerCase()
    ) return 'Pawswap'
    if (
      PANCAKESWAP_ROUTER[chainId]?.address.toLowerCase() === address.toLowerCase()
    ) return 'Pancakeswap'
    return 'Unknown Swap'
  }

  const RouterPanelHeader = (props) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>
        <Badge dot={showUpdateButton(props.router)} offset={[5, 0]}>
          {getRouterName(props.router.address)}
        </Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {truncateAddress(props.router.address)}
      </div>
    </div>  
  )

  const updateTaxes = async (tax) => {
    console.log('updating', tax)
    setUpdateLoading(true)
    await updateTaxSetting(tax)
    setUpdateLoading(false)
    console.log('were done here')
  }

  return (
    <>
      <Alert style={{ borderRadius: '24px', marginBottom: '20px' }} message="You must have contract owner permissions to list or manage your token on PawSwap" type="info" closable />
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {
          props.hideTokenSelector ? '' :
          <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Col>
              Token
            </Col>
            <Col>
              <CurrencyPicker side="list" hideFeatured={false} />
            </Col>
          </Row>
        }
        <Divider>
          <Popover content={<div style={{ maxWidth: '250px' }}>
            Take taxes in {nativeSymbol} and send them directly to the wallets specified
          </div>} trigger="hover">
            {nativeSymbol} Taxes <QuestionCircleOutlined />
          </Popover>
        </Divider>
        <Row>
          <Col span={24}>
            <Collapse ghost expandIconPosition="right">
              {
                nativeTaxes.map((t, i) => (
                  <Panel header={<PanelHeader tax={t}/>} key={i}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex', ...styles.inset }}>
                      <Row>
                        <Col span={24}>
                          <label>Tax Name</label>
                          <Input
                            placeholder="Tax name"
                            value={t.name}
                            onChange={(e) => onNameInputChange(e, t)}
                            size="large"
                            style={{ borderRadius: '1rem' }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                            <label>{t.name} Address</label>
                            <label>{truncateAddress(t.address)}</label>
                          </div>
                          <Input
                            placeholder={`Address that receives ${nativeSymbol}`}
                            value={t.address}
                            onChange={(e) => onAddressInputChange(e, t)}
                            size="large"
                            style={{ borderRadius: '1rem' }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label>Buy Tax Percentage</label>
                          <Input
                            onChange={(e) => onBuyInputChange(e, t)}
                            value={t.buy}
                            size="large"
                            style={{ borderRadius: '1rem' }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label>Sell Tax Percentage</label>
                          <Input
                            onChange={(e) => onSellInputChange(e, t)} 
                            size="large"
                            value={t.sell}
                            style={{ borderRadius: '1rem' }}
                          />
                        </Col>
                      </Row>
                      {
                        !showUpdateButton(t) ? '' :
                        <Row>
                          <Col span={24}>
                            <Button 
                              type="primary" 
                              size="large" 
                              style={styles.button}
                              loading={updateLoading}
                              onClick={() => updateTaxes(t)}
                            >Update</Button>
                          </Col>
                        </Row>
                      }
                    </Space>
                  </Panel>
                ))
              }
              {/*/ TODO this needs to be treated specially so it doesnt look disabled /*/ }
              <Panel header={<PanelHeader tax={customTax}/>}>
                <Space direction="vertical" size="middle" style={{ display: 'flex', ...styles.inset }}>
                  <Row>
                    <Col span={24}>
                      <label>Tax Name</label>
                      <Input
                        placeholder="Tax name"
                        value={customTax.name}
                        onChange={(e) => onNameInputChange(e, customTax)}
                        size="large"
                        style={{ borderRadius: '1rem' }}
                      />
                    </Col>
                  </Row>
                  {
                    !showUpdateButton(customTax) ? '' :
                    <Row>
                      <Col span={24}>
                        <Button 
                          type="primary" 
                          size="large" 
                          style={styles.button}
                          onClick={() => updateTaxes(customTax)}
                          loading={updateLoading}
                        >Update</Button>
                      </Col>
                    </Row>
                  }
                </Space>
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Divider>
          <Popover content={<div style={{ maxWidth: '250px' }}>
            These taxes are taken in the form of your token and are transferred to the wallets you specify
          </div>} trigger="hover">
            Token Taxes <QuestionCircleOutlined />
          </Popover>
        </Divider>
        <Row>
          <Col span={24}>
            <Collapse ghost expandIconPosition="right">
              {
                tokenTaxes.map((t, i) => (
                  <Panel header={<PanelHeader tax={t}/>} key={i}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex', ...styles.inset }}>
                      {
                        t.name === 'Burn Tax'
                          ?
                            <Row>
                              <Col span={24}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                  <label>Burn Tax Address</label>
                                  <label>{truncateAddress(t.address)}</label>
                                </div>
                                <Input
                                  placeholder={DEFAULT_BURN_ADDRESS}
                                  value={t.address}
                                  onChange={(e) => onAddressInputChange(e, t)}
                                  size="large"
                                  style={{ borderRadius: '1rem' }}
                                />
                              </Col>
                            </Row>
                          :
                            <>
                              <Row>
                                <Col span={24}>
                                  <label>Tax Name</label>
                                  <Input
                                    placeholder="Tax name"
                                    value={t.name}
                                    onChange={(e) => onNameInputChange(e, t)}
                                    size="large"
                                    style={{ borderRadius: '1rem' }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col span={24}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                    <label>{t.name} Address</label>
                                    <label>{truncateAddress(t.address)}</label>
                                  </div>
                                  <Input
                                    placeholder="Address that receives tokens"
                                    value={t.address}
                                    onChange={(e) => onAddressInputChange(e, t)}
                                    size="large"
                                    style={{ borderRadius: '1rem' }}
                                  />
                                </Col>
                              </Row>
                            </>
                          }
                      <Row>
                        <Col span={24}>
                          <label>Buy Tax Percentage</label>
                          <Input
                            onChange={(e) => onBuyInputChange(e, t)} 
                            value={t.buy}
                            size="large"
                            style={{ borderRadius: '1rem' }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <label>Sell Tax Percentage</label>
                          <Input
                            onChange={(e) => onSellInputChange(e, t)} 
                            value={t.sell}
                            size="large"
                            style={{ borderRadius: '1rem' }}
                          />
                        </Col>
                      </Row>
                      {
                        !showUpdateButton(t) ? '' :
                        <Row>
                          <Col span={24}>
                            <Button 
                              type="primary" 
                              size="large" 
                              style={styles.button}
                              loading={updateLoading}
                              onClick={() => updateTaxes(t)}
                            >Update</Button>
                          </Col>
                        </Row>
                      }
                    </Space>
                  </Panel>
                ))
              }
            </Collapse>
          </Col>
        </Row>
        <Divider>
          <Popover content={<div style={{ maxWidth: '250px' }}>
            Half of this tax is taken in your token and the other half is taken in {nativeSymbol}. Each swap will automatically add liquidity to your LP.
          </div>} trigger="hover">
            Liquidity Tax <QuestionCircleOutlined />
          </Popover>
        </Divider>
        <Row>
          <Col span={24}>
            <Collapse ghost expandIconPosition="right">
            <Panel header={<PanelHeader tax={liquidityTax}/>}>
              <Space direction="vertical" size="middle" style={{ display: 'flex', ...styles.inset }}>
                <Row>
                  <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                      <label>LP Token Receiver Address</label>
                      <label>{truncateAddress(liquidityTax.address)}</label>
                    </div>
                    <Input
                      placeholder="Address that receives LP tokens"
                      value={liquidityTax.address}
                      onChange={(e) => onAddressInputChange(e, liquidityTax)}
                      size="large"
                      style={{ borderRadius: '1rem' }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label>Buy Tax Percentage</label>
                    <Input
                      onChange={(e) => onBuyInputChange(e, liquidityTax)} 
                      value={liquidityTax.buy}
                      size="large"
                      style={{ borderRadius: '1rem' }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label>Sell Tax Percentage</label>
                    <Input
                      onChange={(e) => onSellInputChange(e, liquidityTax)} 
                      value={liquidityTax.sell}
                      size="large"
                      style={{ borderRadius: '1rem' }}
                    />
                  </Col>
                </Row>
                {
                  !showUpdateButton(liquidityTax) ? '' :
                  <Row>
                    <Col span={24}>
                      <Button 
                        type="primary" 
                        size="large" 
                        style={styles.button}
                        onClick={() => updateTaxes(liquidityTax)}
                        loading={updateLoading}
                      >Update</Button>
                    </Col>
                  </Row>
                }
              </Space>
            </Panel>
            </Collapse>
          </Col>
        </Row>
        <Divider>
          <Popover content={<div style={{ maxWidth: '250px' }}>
            Most tokens are capable of using existing Liquidity Pools with PawSwap. 
            If your token is capable of excluding addresses from incurring taxes 
            when swapping, your token is likely to be compatible with your existing DEX's LP.
            Enter the router address of the DEX you already use and start swapping with 
            PawSwap and your exsiting LP!
          </div>} trigger="hover">
            DEX Router with Liquidity Pool <QuestionCircleOutlined />
          </Popover>
        </Divider>
        <Row>
          <Col span={24}>
            <Collapse ghost expandIconPosition="right">
            <Panel header={<RouterPanelHeader router={router}/>}>
              <Space direction="vertical" size="middle" style={{ display: 'flex', ...styles.inset }}>
                <Row>
                  <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                      <label>Swap Router Address</label>
                      <label>{truncateAddress(router.address)}</label>
                    </div>
                    <Input
                      placeholder="Router address of the swap whose LP will be used"
                      value={router.address}
                      onChange={(e) => onAddressInputChange(e, router)}
                      size="large"
                      style={{ borderRadius: '1rem' }}
                    />
                  </Col>
                </Row>
                {
                  !showUpdateButton(router) ? '' :
                  <Row>
                    <Col span={24}>
                      <Button 
                        type="primary" 
                        size="large" 
                        style={styles.button}
                        onClick={() => updateTaxes(router)}
                        loading={updateLoading}
                      >Update</Button>
                    </Col>
                  </Row>
                }
              </Space>
            </Panel>
            </Collapse>
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default TaxManagementForm