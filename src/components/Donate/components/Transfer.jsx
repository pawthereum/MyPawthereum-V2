import { CreditCardOutlined, MessageOutlined } from "@ant-design/icons";
import { Alert, Collapse, Button, Input, notification } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { networkConfigs } from "helpers/networks";
import isMobile from 'hooks/useBreakpoint'
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

const { Panel } = Collapse;

function Transfer() {
  const { account, chainId } = useMoralis();
  const [message, setMessage] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    amount && account ? setTx({ amount, message }) : setTx();
  }, [account, amount, message]);

  const openNotification = ({ message, description, link }) => {
    notification.open({
      message,
      description,
      onClick: () => {
        if (!link) return
        window.location.href = link
      },
    });
  };

  async function transfer() {
    const { amount, message } = tx;
    console.log('web3.utils.toWei(amount,"eth")', web3.utils.toWei(amount,'ether'))

    setIsPending(true);
    const gasPrice = await eth.getGasPrice()
    const nonce = await eth.getTransactionCount(account)
    const txParams = {
      from: account,
      to: '0x49BD9590D5fEa394362dBD306b92F9cA4D79D895',
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
          link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + hash,
          message: "🔊 Transaction Submitted",
          description: `${hash}`,
        });
        console.log("🔊 New Transaction", hash);
      })
      .on("receipt", (receipt) => {
        openNotification({
          link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + receipt.transactionHash,
          message: "🇺🇦 Thank you for your Donation!",
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

  const readMore = () => {
    window.location.href = "https://blog.pawthereum.com/emergency-donation-131d3b4dca19"
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Emergency Donation for Ukrainian Animal Shelters</h3>
        </div>
        <Alert 
          message="Our emergency donation fundraiser is still ongoing. Read more about what was donated." 
          type="info"
          action={
            <Button size="small" type="primary" onClick={readMore}>
              Read
            </Button>
          }
        />
        <Collapse ghost>
          <Panel header="Donation information" key="1">
            <div>
              <p>
                We are supporting shelters in Ukraine who's #1 goal right now is survival and taking care of their animals. 
              </p>
              <p>
                Next, we are supporting shelters at the border.  Sava's Safe Haven, a shelter in Romania, is putting in some amazing work on the border providing aid for refugees entering with their animals
              </p>
              <p>
                There are two major challenges in Ukraine for the shelters. 
                <ol>
                  <li>They are under attack</li>
                  <li>Much of the aid, medicine, food and generel supply is being send in to Ukraine from the border countries, but the supply cant travel far, so it wont reach many destinations as its too dangerous to transport.</li>
                </ol>
              </p>
              <p>
                The Pawthereum Core Team is in direct talks with shelters and organisations in Ukraine everyday. Our emergency fundraiser is still going, and even the smallest donation will go a long way.
              </p>
              <p>
                All help matters
              </p>
            </div>
          </Panel>
        </Collapse>
        <div style={styles.select}>
          {
            isMobile ? '' :
            <div style={styles.textWrapper}>
              <Text strong>Amount:</Text>
            </div>
          }
          <Input
            size="large"
            placeholder={`Donation in ${networkConfigs[chainId]?.currencySymbol}`}
            prefix={<CreditCardOutlined />}
            onChange={(e) => {
              setAmount(`${e.target.value}`);
            }}
          />
        </div>
        <div style={styles.select}>
          {
            isMobile ? '' :
            <div style={styles.textWrapper}>
              <Text strong>Message:</Text>
            </div>
          }
          <Input
            size="large"
            placeholder="Message stored on blockchain"
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
          Donate 🇺🇦
        </Button>
      </div>
    </div>
  );
}

export default Transfer;
