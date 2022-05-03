import { SettingOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { Modal, InputNumber } from 'antd';
import AppContext from 'AppContext'

function SwapSettings () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { slippage, updateSlippage } = useContext(AppContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onInputChange(amount) {
    console.log({ amount })
    if (amount === null) return
    updateSlippage(amount)
  }

  return (
    <>
      <SettingOutlined onClick={showModal} />
      <Modal title="Swap Settings" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          onChange={onInputChange}
          keyboard={true}
        />
      </Modal>
    </>
  );
}

export default SwapSettings;