
import { useState } from 'react'
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
  const { nativeSymbol } = useNative()

  const [tax1Name, setTax1Name] = useState(null)
  const [tax1Buy, setTax1Buy] = useState(null)
  const [tax1Sell, setTax1Sell] = useState(null)
  const [tax2Name, setTax2Name] = useState(null)
  const [tax2Buy, setTax2Buy] = useState(null)
  const [tax2Sell, setTax2Sell] = useState(null)
  const [tax3Name, setTax3Name] = useState(null)
  const [tax3Buy, setTax3Buy] = useState(null)
  const [tax3Sell, setTax3Sell] = useState(null)
  const [tax4Name, setTax4Name] = useState(null)
  const [tax4Buy, setTax4Buy] = useState(null)
  const [tax4Sell, setTax4Sell] = useState(null)

  const nativeTaxes = [
    { name: tax1Name || 'Tax 1', setName: setTax1Name, setBuy: setTax1Buy, setSell: setTax1Sell, buy: tax1Buy, sell: tax1Sell },
    { name: tax2Name || 'Tax 2', setName: setTax2Name, setBuy: setTax2Buy, setSell: setTax2Sell, buy: tax2Buy, sell: tax2Sell },
    { name: tax3Name || 'Tax 3', setName: setTax3Name, setBuy: setTax3Buy, setSell: setTax3Sell, buy: tax3Buy, sell: tax3Sell },
    { name: tax4Name || 'Tax 4', setName: setTax4Name, setBuy: setTax4Buy, setSell: setTax4Sell, buy: tax4Buy, sell: tax4Sell },
  ]

  const onNameInputChange = (e, nativeTax) => {
    nativeTax.setName(e.target.value)
  }

  const onBuyInputChange = (e, nativeTax) => {
    nativeTax.setBuy(e.target.value)
  }

  const onSellInputChange = (e, nativeTax) => {
    nativeTax.setSell(e.target.value)
  }

  const PanelHeader = (props) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>{props.nativeTax.name}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        { props.nativeTax.buy ? <Tag color="success">{props.nativeTax.buy}</Tag> : '' }
        { props.nativeTax.sell ? <Tag color="error">{props.nativeTax.sell}</Tag> : '' }
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
                          onChange={(e) => onNameInputChange(e, t)}
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
    </>
  )
}

export default NativeTaxForm