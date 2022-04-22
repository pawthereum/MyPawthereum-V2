import { Row, Col, Space, Card } from 'antd'
import { SettingOutlined, ArrowDownOutlined } from "@ant-design/icons";
import CurrencyAmountInput from './components/CurrencyInputAmount.jsx'
// import useSwap from 'hooks/useSwap.js';
import { useContext } from 'react';
import AppContext from '../../AppContext'

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  inset: {
    backgroundColor: '#dfdfdf',
    padding: '14px',
    borderRadius: '1rem'
  }
}

function PawSwap() {
  const { estimatedSide } = useContext(AppContext);
  console.log('this is the estimated side', estimatedSide)

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
              <Row style={styles.inset}>
                <Col span={24}>
                  <span>From {estimatedSide === 'input' ? '(estimated)' : ''} </span>
                  <CurrencyAmountInput side="input" />
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownOutlined />
                </Col>
              </Row>
              <Row style={styles.inset}>
                <Col span={24}>
                  <span>To {estimatedSide === 'output' ? '(estimated)' : ''}</span>
                  <CurrencyAmountInput side="output" />
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