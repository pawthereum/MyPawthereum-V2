import CurrencyPicker from '../components/CurrencyPicker'
import { Divider, Row, Col, Space, Card, Alert, Collapse } from 'antd'
import useNative from 'hooks/useNative';

const { Panel } = Collapse;

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
  },
}

function ListToken () {
  const { nativeSymbol } = useNative()

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
              <Divider>
                {nativeSymbol} Taxes
              </Divider>
              <Row>
                <Col span={24}>
                  <Collapse ghost expandIconPosition="right">
                    <Panel header="Tax 1" key="1">
                      <p>Tax 1</p>
                    </Panel>
                    <Panel header="Tax 2" key="2">
                      <p>Tax 2</p>
                    </Panel>
                    <Panel header="Tax 3" key="3">
                      <p>Tax 3</p>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
              <Divider>
                Token Taxes
              </Divider>
              <Row>
                <Col span={24}>
                  <Collapse ghost expandIconPosition="right">
                    <Panel header="Tax 1" key="1">
                      <p>Tax 1</p>
                    </Panel>
                    <Panel header="Tax 2" key="2">
                      <p>Tax 2</p>
                    </Panel>
                    <Panel header="Tax 3" key="3">
                      <p>Tax 3</p>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ListToken