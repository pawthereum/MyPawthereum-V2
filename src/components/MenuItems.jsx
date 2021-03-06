import { useLocation } from "react-router-dom";
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
        <NavLink to="/quickstart">π Quick Start</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/stats">
        <NavLink to="/stats">π Stats</NavLink>
      </Menu.Item>
      <Menu.Item key="/donaet">
        <NavLink to="/donate">πΊπ¦ Donate</NavLink>
      </Menu.Item>
      <Menu.Item key="/vote">
        <NavLink to="/vote">π³οΈ Vote</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="/wallet">
        <NavLink to="/wallet">π Wallet</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/flooz">
        <NavLink to="/flooz">π³ Credit</NavLink>
      </Menu.Item>
      <Menu.Item key="/pawsend">
        <NavLink to="/pawsend">πΈ PawSend</NavLink>
      </Menu.Item>
      <Menu.Item key="/pawswap">
        <NavLink to="/pawswap">πΎ PawSwap</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="/staking/pools">
        <NavLink to="/staking/pools">π₯© Staking</NavLink>
      </Menu.Item> */}
      {/* <Menu.Item key="/rovingdogs">
        <NavLink to="/rovingdogs">π Roving Dogs</NavLink>
      </Menu.Item> */}
      {/* <Menu.Item key="onramp">
        <NavLink to="/onramp">π΅ Fiat</NavLink>
      </Menu.Item> */}
      {/* <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">π° Balances</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">πΈ Transfers</NavLink>
      </Menu.Item> */}
      {/*
      <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">πΌ NFTs</NavLink>
      </Menu.Item>
      Menu.Item key="/contract">
        <NavLink to="/contract">π Contract</NavLink>
      </Menu.Item> */}
    </Menu>
  );
}

export default MenuItems;
