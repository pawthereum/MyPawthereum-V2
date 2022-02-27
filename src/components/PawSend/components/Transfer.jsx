import AddressInput from "../../AddressInput";
import { CreditCardOutlined, MessageOutlined } from "@ant-design/icons";
import { Alert, Row, Col, Button, Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import usePawSend from "hooks/usePawSend";
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider)
const eth = web3.eth

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
  const { totalSendTax, trySend } = usePawSend();

  // useEffect(() => {
  //   amount && account ? setTx({ amount, message }) : setTx();
  // }, [account, chainId]);

  useEffect(() => {
    if (chainId) getTotalTax()

    async function getTotalTax () {
      const tax = await totalSendTax({ chain: chainId })
      setTotalTax(tax)
    }
  }, [chainId])

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function transfer() {
    console.log('web3.utils.toWei(amount,"eth")', web3.utils.toWei(amount,'ether'))

    setIsPending(true);
    const send = await trySend({ amount, receiver, message, chain: chainId })
    console.log('send', send)

    setReceiver(null)
    setAmount(null)
    setMessage(null)
    setIsPending(false)
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>PawSend</h3>
          <small>Send $PAWTH with only a {totalTax} transaction fee!</small>
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Address:</Text>
          </div>
          <AddressInput autoFocus onChange={setReceiver} />
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Amount:</Text>
          </div>
          <Input
            size="large"
            value={amount}
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setAmount(`${e.target.value}`);
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
          <div style={styles.textWrapper}>
            <Text strong>Message:</Text>
          </div>
          <Input
            size="large"
            prefix={<MessageOutlined />}
            value={message}
            onChange={(e) => {
              setMessage(`${e.target.value}`);
            }}
          />
        </div>
        <Button
          type="primary"
          size="large"
          loading={isPending}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => transfer()}
          disabled={props.pawthBalance < amount || !receiver}
        >
          Send 💸
        </Button>
      </div>
    </div>
  );
}

export default Transfer;
