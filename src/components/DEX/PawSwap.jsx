import { Tabs } from 'antd'
import Swap from './components/Swap'
import Liquidity from './components/Liquidity'
import ListToken from './components/ListToken'
import Leaderboard from './components/Leaderboard'

function PawSwap() {
  return (
    <div>
      <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
        <Tabs.TabPane tab={<span>Swap</span>} key="1">
          <Swap />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Leaderboard</span>} key="2">
          <Leaderboard />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Liquidity</span>} key="3">
          <Liquidity />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>List</span>} key="4">
          <ListToken />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default PawSwap;