import { useContext, useEffect, useState } from "react";
import { Grid, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo, MultichainLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";
import AppContext from '../../AppContext'

const { useBreakpoint } = Grid

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const menuItems = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  {
    key: "0x539",
    value: "Local Chain",
    icon: <ETHLogo />,
  },
  {
    key: "0x3",
    value: "Ropsten Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x5",
    value: "Goerli Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "0x61",
    value: "Smart Chain Testnet",
    icon: <BSCLogo />,
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
  },
  {
    key: "multi",
    value: "Multichain",
    icon: <MultichainLogo />,
  },
]
.filter(c => {
  return process.env.NODE_ENV !== 'production' ? true :
  c.value === 'Ethereum' || c.value === 'Binance' || c.value === 'Multichain' || c.value === 'Smart Chain Testnet'
});

function Chains() {
  const globalContext = useContext(AppContext)
  const { switchNetwork, chainId, chain } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  const screens = useBreakpoint()

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleMenuClick = (e) => {
    // do not actually switch networks if selecting multichain
    if (e.key === 'multi') {
      globalContext.toggleUseMultichain(true)
      setSelected(menuItems.find((item) => item.key === 'multi'))
      return
    }
    // reset menu to chain if coming from multichain
    if (globalContext.multichainEnabled) {
      setSelected(menuItems.find((item) => item.key === e.key))
    }
    globalContext.toggleUseMultichain(false)
    switchNetwork(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (!chainId || !isAuthenticated) return null;

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button key={selected?.key} icon={selected?.icon} style={{ ...styles.button, ...styles.item }}>
          { 
            screens.xs ? '' :
            <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
          }
          <DownOutlined style={{ marginLeft: '5px' }} />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
