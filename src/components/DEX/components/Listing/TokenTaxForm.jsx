
import { useState } from 'react'
import { Divider, Row, Col, Space, Collapse, Input, Tag } from 'antd'
import { COLORS } from '../../../../constants';

const { Panel } = Collapse;

const styles = {
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  }
}

function TokenTaxForm () {
  const DEFAULT_BURN_ADDRESS = '0x000000000000000000000000000000000000dEaD'

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

  const tokenTaxes = [
    { name: tokenTaxName || 'Token Tax', setName: setTokenTaxName, address: tokenTaxAddress, setAddress: setTokenTaxAddresss, setBuy: setTokenTaxBuy, setSell: setTokenTaxSell, buy: tokenTaxBuy, sell: tokenTaxSell },
    { name: 'Burn Tax', address: burnTaxAddress, setAddress: setBurnTaxAddress, setBuy: setBurnTaxBuy, setSell: setBurnTaxSell, buy: burnTaxBuy, sell: burnTaxSell },
  ]

  const liquidityTax =  { 
    name: 'Liquidity Tax', 
    address: liquidityTaxAddress, 
    setAddress: setLiquidityTaxAddress, 
    setBuy: setLiquidityTaxBuy, 
    setSell: setLiquidityTaxSell, 
    buy: liquidityTaxBuy, 
    sell: liquidityTaxSell
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

  const PanelHeader = (props) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>{props.tax.name}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { props.tax.buy ? <Tag color="success">{props.tax.buy}</Tag> : '' }
        { props.tax.sell ? <Tag color="error">{props.tax.sell}</Tag> : '' }
        { !props.tax.buy && !props.tax.sell ? <Tag>disabled</Tag> : '' }
      </div>
    </div>
  )

  return (
    <>
      <Divider>
        Token Taxes
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
                          style={{ borderRadius: '1rem' }}
                        />
                      </Col>
                    </Row>
                  </Space>
                </Panel>
              ))
            }
          </Collapse>
        </Col>
      </Row>
      <Divider>
        Liquidity Tax
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
                    size="large"
                    style={{ borderRadius: '1rem' }}
                  />
                </Col>
              </Row>
            </Space>
          </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}

export default TokenTaxForm