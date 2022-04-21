import { Row, Col, Space, Card, InputNumber } from 'antd'
import { SettingOutlined, ArrowDownOutlined } from "@ant-design/icons";
import CurrencyPicker from './components/CurrencyPicker'
const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
}

function PawSwap() {
  function onInputChange(value) {
    console.log('changed', value);
  }

  return (
    <div>
      <Row>
        <Col>
          <Card style={styles.card} title={
            <Row>
              <Col span={12}>
                PawSwap
              </Col>
              <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
                <SettingOutlined />
              </Col>
            </Row>
          }>            
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Row>
                <Col span={24}>
                  <span>From</span>
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                    size="large"
                    defaultValue="0"
                    min="0"
                    onChange={onInputChange}
                    stringMode
                    addonAfter={<CurrencyPicker side="input" />}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownOutlined />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <span>To</span>
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                    size="large"
                    defaultValue="0"
                    min="0"
                    onChange={onInputChange}
                    stringMode
                    addonAfter={<CurrencyPicker side="output"/>}
                  />
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PawSwap;