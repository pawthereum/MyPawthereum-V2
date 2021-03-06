import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Grid, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

const { useBreakpoint } = Grid;

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#ff65b3",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const screens = useBreakpoint()

  const acctLength = screens.xs ? 4 : 6

  const getCoinbaseConnector = async () => {
    const APP_NAME = 'My Pawthereum'
    const APP_LOGO_URL = 'https://github.com/pawthereum/MyPawthereum/raw/main/src/assets/images/myPawthLogo.png'
    const DEFAULT_ETH_JSONRPC_URL = process.env.REACT_APP_MORALIS_SPEEDY_NODE
    const DEFAULT_CHAIN_ID = 1

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
      darkMode: false
    })

    return coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
  }

  async function activateInjectedProvider(providerName) {
    const { ethereum } = window;
    if (!ethereum?.providers) {
      return undefined;
    }
  
    let provider;
    switch (providerName) {
      case 'Coinbase Wallet':
        provider = ethereum.providers.find(({ isCoinbaseWallet }) => isCoinbaseWallet);
        break;
      case 'Metamask':
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
      default:
        return;
    }
  
    if (provider) {
      ethereum.setSelectedProvider(provider);
    }
    return provider
  }
  
  if (!isAuthenticated || !account) {
    return (
      <>
        <div
          onClick={() => setIsAuthModalVisible(true)}
        >
          <Button style={{ borderRadius: "0.6rem", }} type="primary">
            Connect
          </Button>
        </div>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div style={{ padding: "10px", display: "flex", justifyContent: "center", fontWeight: "700", fontSize: "20px" }}>
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await activateInjectedProvider(title);
                    await authenticate({ 
                      provider: connectorId,
                      signingMessage: 'My Pawthereum' 
                    });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", marginBottom: "0", ...styles.text }}>{getEllipsisTxt(account, acctLength)}</p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "2rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
