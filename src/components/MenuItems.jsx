import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      {/* <Menu.Item key="/quickstart">
        <NavLink to="/quickstart">🚀 Quick Start</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/stats">
        <NavLink to="/stats">📊 Stats</NavLink>
      </Menu.Item>
      <Menu.Item key="/vote">
        <NavLink to="/vote">🗳️ Vote</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="/wallet">
        <NavLink to="/wallet">👛 Wallet</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/flooz">
        <NavLink to="/flooz">💳 Credit</NavLink>
      </Menu.Item>
      <Menu.Item key="/pawswap">
        <NavLink to="/pawswap">🐾 PawSwap</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="onramp">
        <NavLink to="/onramp">💵 Fiat</NavLink>
      </Menu.Item> */}
      {/* <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">💰 Balances</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">💸 Transfers</NavLink>
      </Menu.Item> */}
      {/* <Menu.Item key="/donaet">
        <NavLink to="/donate">💖 Donate</NavLink>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">🖼 NFTs</NavLink>
      </Menu.Item>
      Menu.Item key="/contract">
        <NavLink to="/contract">📄 Contract</NavLink>
      </Menu.Item> */}
    </Menu>
  );
}

export default MenuItems;
