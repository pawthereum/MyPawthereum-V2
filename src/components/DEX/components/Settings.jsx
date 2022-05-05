import { SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { Row, Col, Modal, InputNumber, Checkbox, Space } from 'antd';
import AppContext from 'AppContext'

function SwapSettings () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { slippage, updateSlippage, updateIgnorePriceHighImpact } = useContext(AppContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onSlippageInputChange(amount) {
    console.log({ amount })
    if (amount === null) return
    updateSlippage(amount)
  }

  function onHighImpactChange(e) {
    console.log(`checked = ${e.target.checked}`);
    updateIgnorePriceHighImpact(e.target.checked)
  }

  return (
    <>
      <SettingOutlined onClick={showModal} />
      <Modal title="Swap Settings" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row>
            <Col>
              <InputNumber
                style={{
                  width: '100%',
                  fontWeight: 900,
                  fontSize: '1.25em',
                }}
                addonBefore="Slippage"
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                placeholder="0"
                size="large"
                defaultValue={null}
                min={0}
                max={50}
                value={slippage * 100}
                onChange={onSlippageInputChange}
                keyboard={true}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox onChange={onHighImpactChange}>Ignore High Price Impact</Checkbox>
            </Col>
          </Row>
        </Space>
      </Modal>
    </>
  );
}

export default SwapSettings;