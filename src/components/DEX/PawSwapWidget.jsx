import { useState, useEffect } from 'react'
import { useChain } from 'react-moralis'
import { useSearchParams } from "react-router-dom";
import Swap from './components/Swap'

const styles = {
  widget: {
    backgroundColor: 'transparent',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }
}

function PawSwapWidget() {
  const { chainId } = useChain();
  const [searchParams] = useSearchParams();
  const [switchNetworkRequired, setSwitchNetworkRequired] = useState(false)
  const chain = searchParams.get("chain")

  useEffect(() => {
    if (!chainId || !chain) return
    if (chainId !== chain) return setSwitchNetworkRequired(true)
    setSwitchNetworkRequired(false)
  }, [chainId])

  return (
    <div style={styles.widget}>
      <Swap 
        showSwitchNetwork={switchNetworkRequired}
        switchNetworkTo={chain}
        showAccount={!switchNetworkRequired}
      />
    </div>
  )
}

export default PawSwapWidget;