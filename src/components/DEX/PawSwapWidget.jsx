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
  return (
    <div style={styles.widget}>
      <Swap />
    </div>
  )
}

export default PawSwapWidget;