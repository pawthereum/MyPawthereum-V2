import { Tabs } from 'antd'
import Swap from './components/Swap'
import Liquidity from './components/Liquidity'


function PawSwap() {
  return (
    <div>
      <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
        <Tabs.TabPane tab={<span>Swap</span>} key="1">
          <Swap />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Liquidity</span>} key="2">
          <Liquidity />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default PawSwap;