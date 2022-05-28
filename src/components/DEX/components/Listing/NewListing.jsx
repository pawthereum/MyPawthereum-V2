import { useContext, useState, useEffect } from 'react'
import { Row, Col, Steps, Button, Typography, Input, Checkbox, Space } from 'antd'
import AppContext from 'AppContext';
import TaxManagementForm from './TaxManagementForm';
import { useMoralis } from 'react-moralis'
import CurrencyPicker from '../CurrencyPicker';
import { COLORS, PAWSWAP } from '../../../../constants';

const { Step } = Steps
const { Paragraph, Text } = Typography;

const styles = {
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  },
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  },
}

function NewListing () {
  const { 
    listCurrency,
    createListing,
    deployTaxStructure, 
    listTaxStructContract,
    updateTaxStructureByAddress
  } = useContext(AppContext)
  const { chainId } = useMoralis()
  const [currentStep, setCurrentStep] = useState(0)
  const [furthestStep, setFurthestStep] = useState(0)
  const [listButtonIsDisabled, setListButtonIsDisabled] = useState(true)
  const [listButtonIsLoading, setListButtonIsLoading] = useState(false)
  const [exclusionAcknowleged, setExclusionAcknowledged] = useState(false)
  const [taxStructAddr, setTaxStructAddr] = useState(null)
  const [taxStructAddrInputIsVisible, setTaxStructAddrInputIsVisible] = useState(false)
//0x59482A23b827f97C761400c01774990eb9e282d8
  const deployTaxStructContract = async () => {
    await deployTaxStructure()
    setCurrentStep(currentStep + 1)
    if (currentStep + 1 > furthestStep) {
      setFurthestStep(currentStep + 1)
    }
  }

  const onTaxStructAddrInputChange = (e) => {
    setTaxStructAddr(e.target.value)
  }

  const continueWithExistingTaxStructAddr = async () => {
    await updateTaxStructureByAddress(taxStructAddr)
    setCurrentStep(currentStep + 1)
    if (currentStep + 1 > furthestStep) {
      setFurthestStep(currentStep + 1)
    }
  }

  const continueToListing = () => {
    setCurrentStep(currentStep + 1)
    if (currentStep + 1 > furthestStep) {
      setFurthestStep(currentStep + 1)
    }
  }

  const toggleTaxExclusionAcknowledged = (e) => {
    setExclusionAcknowledged(e.target.checked)
  };

  useEffect(() => {
    setListButtonIsDisabled(!exclusionAcknowleged || !listCurrency)
  }, [exclusionAcknowleged, listCurrency])

  const tryListToken = async () => {
    setListButtonIsLoading(true)
    await createListing()
    setListButtonIsLoading(false)
  }

  const onStepChange = (value) => {
    if (value > furthestStep) return
    setCurrentStep(value)
  }

  return (
    <div>
      <Row>
        <Col>
          <Steps 
            size="small" 
            current={currentStep} 
            style={{ marginBottom: '25px' }}
            onChange={onStepChange}
          >
            <Step title="Deploy Tax"/>
            <Step title="Setup Taxes" />
            <Step title="List!" />
          </Steps>
        </Col>
      </Row>
      {
        currentStep !== 0 ? '' : 
        <Row>
          <Col span={24}>
            <Paragraph>
              <Text>Deploy a smart contract that will govern how your token's taxes are structured on PawSwap</Text>
            </Paragraph>
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
                borderRadius: "0.6rem",
                height: "50px",
                marginTop: "10px",
                ...styles.outset,
              }}
              onClick={() => deployTaxStructContract()}
            >
              Deploy Tax Structure
            </Button>
          </Col>
          <Button
            size="large"
            style={{
              width: "100%",
              borderRadius: "0.6rem",
              height: "50px",
              marginTop: "10px",
              ...styles.outset,
            }}
            onClick={() => setTaxStructAddrInputIsVisible(true)}
          >
            I have a tax structure address
          </Button>
          {
            !taxStructAddrInputIsVisible ? '' :
            <div style={{ width: '100%', marginTop: '10px', ...styles.inset }}>
              <Input
                onChange={onTaxStructAddrInputChange} 
                size="large"
                placeholder="Tax structure contract address"
                value={taxStructAddr}
                style={{ borderRadius: '1rem' }}
              />
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: "0.6rem",
                  height: "50px",
                  marginTop: "10px",
                  ...styles.outset,
                }}
                onClick={() => continueWithExistingTaxStructAddr()}
              >
                Continue
              </Button>
            </div>
          }
        </Row>
      }
      {
        currentStep !== 1 ? '' :
        <div>
          <Row><Col>
            You've deployed your Tax Structure contract at this address:
          </Col></Row>
          <Row><Col>
            <small><code>{listTaxStructContract?.address}</code></small>
          </Col></Row>
          <Row><Col>
            Save this address if you need to leave and come back later!
          </Col></Row>
          <Row><Col>
            Setup the taxes the way you'd like and then click Continue to go to the final step of launching your token on PawSwap!
          </Col></Row>
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: "0.6rem",
                  height: "50px",
                  marginTop: "10px",
                  ...styles.outset,
                }}
                onClick={() => continueToListing()}
              >
                Continue
              </Button>
            </Col>
          </Row>
          <TaxManagementForm hideTokenSelector={true} />
        </div>
      }
      {
        currentStep !== 2 ? '' :
        <div>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row><Col>
              Before you list, be sure that you exclude PawSwap from your token's taxes
            </Col></Row>
            <Row><Col>
              <small><code>{PAWSWAP[chainId]?.address}</code></small>
            </Col></Row>
            <Row>
              <Col span={24}>
                <Checkbox onChange={toggleTaxExclusionAcknowledged}>PawSwap is Excluded</Checkbox>
              </Col>
            </Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col span={!listCurrency ? 12 : 16}>
                Select your token
              </Col>
              <Col span={!listCurrency ? 12 : 8}>
                <CurrencyPicker side="list" preventTaxStructFetch={true} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    width: "100%",
                    borderRadius: "0.6rem",
                    height: "50px",
                    marginTop: "10px",
                    ...styles.outset,
                  }}
                  disabled={listButtonIsDisabled}
                  loading={listButtonIsLoading}
                  onClick={() => tryListToken()}
                >
                  List!
                </Button>
              </Col>
            </Row>
          </Space>
        </div>
      }
    </div>
  )
}

export default NewListing;