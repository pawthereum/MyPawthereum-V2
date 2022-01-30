import { CreditCardOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
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

function Transfer() {
  const { account } = useMoralis();
  const [message, setMessage] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    amount && account ? setTx({ amount, message }) : setTx();
  }, [account, amount, message]);

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
    const { amount, message } = tx;
    console.log('web3.utils.toWei(amount,"eth")', web3.utils.toWei(amount,'ether'))

    setIsPending(true);
    const gasPrice = await eth.getGasPrice()
    const nonce = await eth.getTransactionCount('0x9036464e4ecD2d40d21EE38a0398AEdD6805a09B')
    const txParams = {
      from: account,
      to: '0xE07Cb1c63ECFf5fdA2a18aCE4C1E603B09e1cAc6',
      value: web3.utils.toWei(amount,'ether'),
      gasPrice,
      nonce
    }
    if (message) {
      txParams.data = web3.utils.toHex(message)
    }
    const gas = await eth.estimateGas(txParams)
    txParams.gas = gas

    eth.sendTransaction(txParams)
      .on("transactionHash", (hash) => {
        openNotification({
          message: "🔊 New Transaction",
          description: `${hash}`,
        });
        console.log("🔊 New Transaction", hash);
      })
      .on("receipt", (receipt) => {
        openNotification({
          message: "📃 New Receipt",
          description: `${receipt.transactionHash}`,
        });
        console.log("🔊 New Receipt: ", receipt);
        setIsPending(false);
      })
      .on("error", (error) => {
        openNotification({
          message: "📃 Error",
          description: `${error.message}`,
        });
        console.error(error);
        setIsPending(false);
      });
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Donate</h3>
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Amount:</Text>
          </div>
          <Input
            size="large"
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setAmount(`${e.target.value}`);
            }}
          />
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Message:</Text>
          </div>
          <Input
            size="large"
            prefix={<MessageOutlined />}
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
          disabled={!tx}
        >
          Donate 💸
        </Button>
      </div>
    </div>
  );
}

export default Transfer;
