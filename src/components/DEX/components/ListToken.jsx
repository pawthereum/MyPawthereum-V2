import CurrencyPicker from '../components/CurrencyPicker'
import { Row, Col, Space, Card, Alert } from 'antd'
import NativeTaxForm from './Listing/NativeTaxForm'
import TokenTaxForm from './Listing/TokenTaxForm'

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function ListToken () {
  return (
    <div>
      <Row>
        <Col>
          <Card style={styles.card} title={<div>List Token</div>}>
            <Alert style={{ borderRadius: '24px', marginBottom: '20px' }} message="You must have contract owner permissions to list or manage your token on PawSwap" type="info" closable />
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Col>
                  Token
                </Col>
                <Col>
                  <CurrencyPicker side="list" hideFeatured={true} />
                </Col>
              </Row>
              <NativeTaxForm />
              <TokenTaxForm />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ListToken