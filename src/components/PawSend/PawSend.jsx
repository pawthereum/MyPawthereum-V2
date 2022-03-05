import { useMoralis } from 'react-moralis'
import { useERC20Balance } from 'hooks/useERC20Balance';
import { PAWTH_ADDRESS } from '../../constants'
import Transfer from './components/Transfer'
import History from './components/History'
import NativeBalance from "../NativeBalance";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card, Tabs } from "antd";

const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "600",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

function PawSend() {
  const { assets } = useERC20Balance()
  const { chainId } = useMoralis()
  const pawth = assets ? assets.find(a => a.token_address === PAWTH_ADDRESS[chainId]) : undefined
  const pawthBalanceRaw = pawth ? pawth.balance : '0'
  const pawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0

  return (
    <Card
      style={styles.card}
      title={
        <div style={styles.header}>
          <Blockie scale={5} avatar currentWallet style />
          <Address size="6" copyable />
          <NativeBalance />
          {pawthBalance.toLocaleString()} PAWTH
        </div>
      }
    >
      <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
        <Tabs.TabPane tab={<span>PawSend</span>} key="1">
          <Transfer pawthBalance={pawthBalance} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>History</span>} key="2">
          <History/>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}

export default PawSend;
