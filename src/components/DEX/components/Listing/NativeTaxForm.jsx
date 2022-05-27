
import { useState, useContext } from 'react'
import AppContext from 'AppContext'
import { Divider, Row, Col, Space, Collapse, Input, Tag } from 'antd'
import useNative from 'hooks/useNative';
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

function NativeTaxForm () {
  const { 
    listTaxStructFeeDecimal,
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
  } = useContext(AppContext)
  const { nativeSymbol } = useNative()

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

  const formatTaxForViewing = (tax) => {
    if (!tax) return null
    return Number(tax.toString()) / 10**listTaxStructFeeDecimal
  }

  const nativeTaxes = [
    { 
      name: tax1Name || listTaxStructTax1Name || 'Tax 1', 
      setName: setTax1Name, 
      setBuy: setTax1Buy, 
      setSell: setTax1Sell, 
      buy: tax1Buy !== null ? tax1Buy : formatTaxForViewing(listTaxStructTax1Buy), 
      sell: tax1Sell !== null ? tax1Sell : formatTaxForViewing(listTaxStructTax1Sell), 
      address: tax1Address || listTaxStructTax1Address,
      setAddress: setTax1Address
    },
    { 
      name: tax2Name || listTaxStructTax2Name || 'Tax 2', 
      setName: setTax2Name, 
      setBuy: setTax2Buy, 
      setSell: setTax2Sell, 
      buy: tax2Buy !== null ? tax2Buy : formatTaxForViewing(listTaxStructTax2Buy), 
      sell: tax2Sell !== null ? tax2Sell : formatTaxForViewing(listTaxStructTax2Sell), 
      address: tax2Address || listTaxStructTax2Address,
      setAddress: setTax2Address 
    },
    { 
      name: tax3Name || listTaxStructTax3Name || 'Tax 3', 
      setName: setTax3Name, 
      setBuy: setTax3Buy, 
      setSell: setTax3Sell, 
      buy: tax3Buy !== null ? tax3Buy : formatTaxForViewing(listTaxStructTax3Buy), 
      sell: tax3Sell !== null ? tax3Sell : formatTaxForViewing(listTaxStructTax3Sell), 
      address: tax3Address || listTaxStructTax3Address, 
      setAddress: setTax3Address 
    },
    { 
      name: tax4Name || listTaxStructTax4Name || 'Tax 4', 
      setName: setTax4Name, 
      setBuy: setTax4Buy, 
      setSell: setTax4Sell, 
      buy: tax4Buy !== null ? tax4Buy : formatTaxForViewing(listTaxStructTax4Buy), 
      sell: tax4Sell !== null ? tax4Sell : formatTaxForViewing(listTaxStructTax4Sell), 
      address: tax4Address || listTaxStructTax4Address, 
      setAddress: setTax4Address 
    },
  ]

  const onNameInputChange = (e, nativeTax) => {
    nativeTax.setName(e.target.value)
  }

  const onAddressInputChange = (e, tax) => {
    tax.setAddress(e.target.value)
  }

  const onBuyInputChange = (e, nativeTax) => {
    nativeTax.setBuy(e.target.value)
  }

  const onSellInputChange = (e, nativeTax) => {
    nativeTax.setSell(e.target.value)
  }

  const truncateAddress = (addr) => {
    const MIN_ADDR_LENGTH = 42
    if (!addr || addr.length !== MIN_ADDR_LENGTH) return null
    return addr.slice(0, 5) + '...' + addr.substring(addr.length - 4)
  }

  const PanelHeader = (props) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>{props.nativeTax.name}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { props.nativeTax.buy ? <Tag color="success">{props.nativeTax.buy}%</Tag> : '' }
        { props.nativeTax.sell ? <Tag color="error">{props.nativeTax.sell}%</Tag> : '' }
        { !props.nativeTax.buy && !props.nativeTax.sell ? <Tag>disabled</Tag> : '' }
      </div>
    </div>
  )

  return (
    <>
      <Divider>
        {nativeSymbol} Taxes
      </Divider>
      <Row>
        <Col span={24}>
          <Collapse ghost expandIconPosition="right">
            {
              nativeTaxes.map((t, i) => (
                <Panel header={<PanelHeader nativeTax={t}/>} key={i}>
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
                  </Space>
                </Panel>
              ))
            }
          </Collapse>
        </Col>
      </Row>
    </>
  )
}

export default NativeTaxForm