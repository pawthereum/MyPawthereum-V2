import AddressInput from "../../AddressInput";
import { CreditCardOutlined, MessageOutlined } from "@ant-design/icons";
import { Alert, Row, Col, Button, Input, InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import usePawSend from "hooks/usePawSend";
import useBreakpoint from "hooks/useBreakpoint";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};

function Transfer(props) {
  const { account, chainId } = useMoralis();
  const [message, setMessage] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);
  const [receiver, setReceiver] = useState();
  const [totalTax, setTotalTax] = useState();
  const { totalSendTax, trySend, updateAllowance, hasAllowance } = usePawSend(chainId);
  const [allowanceButton, setAllowanceButton] = useState({
    display: false,
    isLoading: false,
    isActive: false,
    text: 'Approve'
  })
  const { isMobile } = useBreakpoint();

  async function attemptAllowance () {
    setAllowanceButton({
      display: true,
      isActive: false,
      isLoading: true,
      text: `Approving PAWTH`
    })
    await updateAllowance(amount)
    return setAllowanceButton({
      display: false,
      isActive: false,
      isLoading: false,
      text: 'Approve'
    })
  }

  useEffect(() => {
    if (!chainId) return

    getTotalTax()

    if (amount || receiver) {
      checkHasSufficientAllowance()
    }

    async function getTotalTax () {
      const tax = await totalSendTax({ chain: chainId })
      setTotalTax(tax)
    }

    async function checkHasSufficientAllowance() {
      if (!amount) {
        return setAllowanceButton({
          display: false,
          isLoading: false,
          isActive: false,
          text: `Approve PAWTH`
        })
      }
      const hasSufficientAllowance = await hasAllowance(amount)
      if (!hasSufficientAllowance) {
        return setAllowanceButton({
          display: true,
          isLoading: false,
          isActive: receiver && amount,
          text: `Approve PAWTH`
        })
      }
      return setAllowanceButton({
        display: false,
        isLoading: false,
        isActive: false,
        text: `Approve PAWTH`
      })
    }
  }, [chainId, amount, receiver])

  async function transfer() {
    setIsPending(true);
    await trySend({ amount, receiver, message, chain: chainId })

    setReceiver(null)
    setAmount(null)
    setMessage(null)
    setAllowanceButton({
      display: false,
      isLoading: false,
      isActive: false,
      text: `Approve PAWTH`
    })
    setIsPending(false)
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <small>Send $PAWTH with only a {totalTax} transaction fee!</small>
        </div>
        <div style={styles.select}>
          { 
            isMobile ? '' :
            <div style={styles.textWrapper}>
              <Text strong>Address:</Text>
            </div>
          }
          <AddressInput autoFocus onChange={setReceiver} />
        </div>
        <div style={styles.select}>
          { 
            isMobile ? '' :
            <div style={styles.textWrapper}>
              <Text strong>Amount:</Text>
            </div>
          }
          <InputNumber
            size="large"
            value={amount}
            placeholder="Amount"
            style={{ width: '100%' }}
            prefix={<CreditCardOutlined />}
            onChange={(value) => {
              setAmount(value);
            }}
          />
        </div>
        {
            !amount || props.pawthBalance >= amount ? '' :
            <Row style={{ marginTop: '5px', textAlign: 'center' }}>
              <Col span={24}>
                <Alert 
                  type="warning"
                  message="You cannot send more than your balance"
                  showIcon
                />
              </Col>
            </Row>
          }
        <div style={styles.select}>
          { 
            isMobile ? '' :
            <div style={styles.textWrapper}>
              <Text strong>Message:</Text>
            </div>
          }
          <Input
            size="large"
            prefix={<MessageOutlined />}
            value={message}
            placeholder="Optional Message"
            onChange={(e) => {
              setMessage(`${e.target.value}`);
            }}
          />
        </div>
        <Row gutter={6}>
          {
            !allowanceButton.display ? '' :
            <Col span={12}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  marginTop: "15px",
                  borderRadius: "0.6rem",
                  height: "50px",
                }}
                onClick={() => attemptAllowance()}
                disabled={!allowanceButton.isActive}
                loading={allowanceButton.isLoading}
              >
                {allowanceButton.text}
              </Button>
            </Col>
          }
          <Col span={allowanceButton.display ? 12 : 24}> 
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "0.6rem",
                height: "50px",
              }}
              onClick={() => transfer()}
              disabled={!amount || (props.pawthBalance < amount || !receiver) || allowanceButton.display && (allowanceButton.isActive || allowanceButton.isLoading)}
              loading={isPending}
            >
              Send 💸
            </Button>
          </Col>
        </Row>
        {/* <Button
          type="primary"
          size="large"
          loading={isPending}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => transfer()}
          disabled={props.pawthBalance < amount || !receiver}
        >
          Send 💸
        </Button> */}
      </div>
    </div>
  );
}

export default Transfer;
