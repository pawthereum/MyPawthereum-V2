import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Card, Row, Col, Button } from "antd";
import { rovingDogsAbi } from 'constants/abis/rovingDogs';
import { networkConfigs } from 'helpers/networks';
import { notification } from "antd";

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  rovingDogsText: {
    marginTop: '10px',
    marginBottom: '10px',
    textAlign: 'center'
  },
  w100: {
    width: '100%'
  }
}

const openNotification = ({ message, description, link }) => {
  notification.open({
    message,
    description,
    onClick: () => {
      if (!link) return
      window.location.href = link
    },
    placement: 'topRight'
  });
};

function RovingDogs() {
  const { chainId, Moralis, web3 } = useMoralis()
  const web3Provider = Moralis.web3Library;
  const [isLoading, setIsLoading] = useState(false);

  async function claimPawth () {
    if (!web3Provider) return
    setIsLoading(true)
    
    const pawthClaimer = new web3Provider.Contract(
      '0xb5612acbaeB47bdC934B2D039F6a8B96efB2dfCB',
      rovingDogsAbi,
      web3.getSigner()
    )
    try {
      const claimReq = await pawthClaimer.claim()
      openNotification({
        message: "🔊 Claim Submitted!",
        description: `${claimReq.hash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + claimReq.hash
      });
      const tx = await claimReq.wait()
      openNotification({
        message: "🎉 Claim Complete!",
        description: `${tx.transactionHash}`,
        link: networkConfigs[chainId].blockExplorerUrl + 'tx/' + tx.transactionHash
      });
    } catch (e) {
      openNotification({
        message: "⚠️ Claim Error!",
        description: `${e.message}`
      });
    }
    
    setIsLoading(false)
  }
  
  return (
    <Row>
      <Col>
        <Card style={styles.card}>
          <Row>
            <Col>
              <img src="https://rovingdogs.com/wp-content/uploads/2022/04/BWLogo-ROVING.png"/>
            </Col>
          </Row>
          <p style={styles.rovingDogsText}>Holders of the Roving Dogs NFT are eliglbe to claim 1,000 free Pawthereum tokens per NFT!</p>
          <Button 
            type="primary"
            style={styles.w100}
            loading={isLoading}
            onClick={() => claimPawth()}
          >
            Claim
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
export default RovingDogs;
