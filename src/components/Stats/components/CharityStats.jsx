
import { useMoralis } from "react-moralis";
import { Divider, Row, Col } from "antd";
import CharityTransactions from '../components/CharityTransactions';
import CharityTokensCollected from '../components/CharityTokensCollected';
import CharityEthCollected from "./CharityEthCollected";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "10px",
    paddingBottom: "20px",
  },
  body: {
    textAlign: "center",
  },
  logo: {
    padding: "10px",
    height: "100px",
    width: "100px"
  },
};

function CharityStats(props) {
  const { chainId } = useMoralis()
  const showBnbCollected = chainId === '0x38' || chainId === '0x64' 

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Charity Wallet</h3>
        </div>
        { showBnbCollected 
          ?
            <CharityEthCollected chainId={props.chainId} charityWallet={props.charityWallet} />
          :
            <CharityTokensCollected chainId={props.chainId} charityWallet={props.charityWallet} />
        }
        <Row>
          <Col span={24} style={{ marginTop: '10px' }}>
            <Divider orientation="left">Transaction History</Divider>
            <CharityTransactions chainId={props.chainId} charityWallet={props.charityWallet} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CharityStats