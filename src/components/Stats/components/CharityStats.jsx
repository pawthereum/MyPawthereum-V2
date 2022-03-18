
import { useMoralis, useTokenPrice } from "react-moralis";
import { useState } from "react";
import { Divider, Row, Col, Radio  } from "antd";
import CharityTransactions from '../components/CharityTransactions';
import CharityTokensCollected from '../components/CharityTokensCollected';
import CharityEthCollected from "./CharityEthCollected";
import { networkConfigs } from "helpers/networks";
import { PAWTH_ADDRESS } from "../../../constants";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "10px",
    paddingBottom: "0px"
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

function getChainNameById (chainId) {
  switch (chainId) {
    case '0x1':
      return 'eth'
    case '0x38':
      return 'bsc'
    default:
      return 'eth'
  }
}

function CharityStats(props) {
  const { chainId } = useMoralis()
  const showBnbCollected = chainId === '0x38' || chainId === '0x64' 
  
  const [timeFrame, setTimeFrame] = useState('24h')
  const timeFrames = {
    '24h': new Date(new Date().getTime() - (24 * 60 * 60 * 1000)), // this time 24h ago
    '1w': new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)), // this time 1w ago
    '1m': new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)) // this time 1m ago
  }

  const WETH_ADDRESS = !chainId ? null : networkConfigs[chainId].wrapped
  const { data: wethData } = useTokenPrice({
    address: WETH_ADDRESS,
    chain: getChainNameById(chainId || '0x38')
  })
  const wethPrice = wethData ? wethData.usdPrice : 0

  const { data: tokenData } = useTokenPrice({
    address: PAWTH_ADDRESS[chainId] || PAWTH_ADDRESS['0x1'],
    chain: getChainNameById(chainId || '0x1')
  })
  const tokenPrice = tokenData ? tokenData.usdPrice : 0

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Charity Wallet</h3>
        </div>
        <Row>
          <Col span={24} style={{ textAlign: 'center', marginBottom: '10px' }}>
            <Radio.Group value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
              <Radio.Button value="24h">24h</Radio.Button>
              <Radio.Button value="1w">1w</Radio.Button>
              <Radio.Button value="1m">1m</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        { showBnbCollected 
          ?
            <CharityEthCollected 
              chainId={props.chainId} 
              charityWallet={props.charityWallet} 
              timeFrame={timeFrames[timeFrame]}
              timeFrameTitle={timeFrame}
              wethPrice={wethPrice}
            />
          :
            <CharityTokensCollected 
              chainId={props.chainId} 
              charityWallet={props.charityWallet} 
              timeFrame={timeFrames[timeFrame]}
              timeFrameTitle={timeFrame}
              tokenPrice={tokenPrice}
            />
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