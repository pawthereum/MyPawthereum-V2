import { useState, useContext, useEffect } from 'react';
import { useMoralis } from 'react-moralis'
import { Space, Row, Col, Modal, Button, Typography } from 'antd';
import AppContext from 'AppContext';
import { ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ConfirmSwapModal = () => {
  const {
    inputCurrency,
    inputAmount,
    outputCurrency,
    outputAmount,
    trade,
    getBuyAmountIn
  } = useContext(AppContext);
  const { Moralis } = useMoralis()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buildModal, setBuildModal] = useState(false)
  const [estimationText, setEstimationText] = useState(null)
  const [estimatedAmount, setEstimatedAmount] = useState(null)

  const showModal = () => {
    setIsModalVisible(true);
    updateEstimation();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateEstimation = async () => {
    const amountIn = await getBuyAmountIn()
    console.log({amountIn})
  }

  useEffect(() => {
    console.log({
      inputAmount,
      outputAmount,
      inputCurrency,
      outputCurrency,
      trade
    })
    if (trade && trade.swap && inputCurrency && outputCurrency) {
      const web3Provider = Moralis.web3Library;
      const BigNumber = web3Provider.BigNumber

      if (trade?.estimatedSide === 'output') {
        setEstimationText(`Output is estimated. You will receive at least `)
      } else {
        setEstimationText(`Input is estimated. You will spend at most `)
      }
      const minAmountDecimals = trade.swap.outputAmountSlippage.token.decimals
      setEstimatedAmount(Moralis.Units.FromWei(BigNumber.from(trade.swap.outputAmountSlippage.raw.toString()), minAmountDecimals))
      return setBuildModal(true)
    }
    return setBuildModal(false)
  }, [trade, inputAmount, outputAmount, inputCurrency, outputCurrency])

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Confirm Swap
      </Button>
        <Modal title="Confirm Swap" visible={isModalVisible} footer={null} onCancel={handleCancel}>
        { !buildModal ? '' :
          <Space direction="vertical" size="middle" style={{ display: 'flex', fontSize: '1.65rem' }}>
            <Row gutter={6}>
              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <img src={inputCurrency?.logoURI} width="50px"/>
                    <span style={{ marginLeft: '10px' }}>
                      {inputAmount.toSignificant(9)}
                    </span>
                  </div>
                  <div>
                    {inputCurrency?.symbol}
                  </div>
                </div>
              </Col>
            </Row>  
            <Row gutter={6} style={{ display: 'flex', alignItems: 'center' }}>
              <Col style={{ paddingLeft: '15px' }}>
                <ArrowDownOutlined />
              </Col>
            </Row>
            <Row gutter={6}>
              <Col span={24}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <img src={outputCurrency?.logoURI} width="50px"/>
                    <span style={{ marginLeft: '10px' }}>
                      {trade?.swap?.outputAmount.toSignificant(9)}
                    </span>
                  </div>
                  <div>
                    {outputCurrency?.symbol}
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ fontSize: '1rem', marginTop: '15px' }}>
              <Col>
                <Text italic>{estimationText}</Text>
                <Text italic style={{ color: outputCurrency?.color }}>{estimatedAmount} {
                  trade?.estimatedSide === 'output' ? outputCurrency?.symbol : inputCurrency?.symbol
                }</Text>
                <Text italic> or the transaction will revert.</Text>
              </Col>
            </Row>
          </Space>   
        }
        </Modal>
    </>
  );
};

export default ConfirmSwapModal;