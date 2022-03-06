import { useMoralis, useTokenPrice } from "react-moralis";
import Account from "../../Account/Account";
import { PAWTH_ADDRESS } from '../../../constants'
import { Row, Col, Skeleton, Statistic } from "antd";
import { useERC20Balance, useBscERC20Balance, useEthERC20Balance } from "hooks/useERC20Balance";
import { useBscERC20Transfers, useEthERC20Transfers, useERC20Transfers } from "hooks/useERC20Transfers";
import AppContext from '../../../AppContext'
import { useContext, useEffect, useState } from 'react'

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "10px",
    paddingBottom: "20px",
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

function Reflections() {
  console.log('loading the reflections...')
  const globalContext = useContext(AppContext);
  console.log('globalContext', globalContext)
  const { ethAssets } = useEthERC20Balance();
  const { bscAssets } = useBscERC20Balance();
  const { assets } = useERC20Balance();

  const { ethERC20Transfers } = useEthERC20Transfers();
  const { bscERC20Transfers } = useBscERC20Transfers();
  const { ERC20Transfers } = useERC20Transfers();

  const { data: ethPriceData } = useTokenPrice({
    address: PAWTH_ADDRESS['0x1'],
    chain: 'eth'
  })
  const { data: bscPriceData } = useTokenPrice({
    address: PAWTH_ADDRESS['0x38'],
    chain: 'bsc'
  })

  const { account, chainId } = useMoralis();
  const [price, setPrice] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [balanceWithoutReflections, setBalanceWithoutReflections] = useState(0);
  const [reflections, setReflections] = useState(0);

  useEffect(() => {
    // no sense in doing all of the calculations unless we have all of the data we need
    if (!chainId || !assets || !ERC20Transfers || 
        !ethAssets || !ethERC20Transfers || !ethPriceData || 
        !bscAssets || !bscERC20Transfers || !bscPriceData) return
    // bsc
    const bscPawthAddress = PAWTH_ADDRESS['0x38']
    const bscPawth = bscAssets ? bscAssets.find(a => a.token_address === bscPawthAddress) : []
    const bscPawthBalanceRaw = bscPawth ? bscPawth.balance : '0'
    const bscPawthBalance = bscPawth ? parseInt(bscPawthBalanceRaw) / 10**parseInt(bscPawth.decimals) : 0
    const bscPawthTransfers = bscERC20Transfers.filter(t => t.address === bscPawthAddress) || []

    // eth
    const ethPawthAddress = PAWTH_ADDRESS['0x1']
    const ethPawth = ethAssets ? ethAssets.find(a => a.token_address === ethPawthAddress) : []
    const ethPawthBalanceRaw = ethPawth ? ethPawth.balance : '0'
    const ethPawthBalance = ethPawth ? parseInt(ethPawthBalanceRaw) / 10**parseInt(ethPawth.decimals) : 0
    const ethPawthTransfers = ethERC20Transfers.filter(t => t.address === ethPawthAddress) || []

    // current chain
    const pawthAddress = PAWTH_ADDRESS[chainId]
    const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
    const pawthBalanceRaw = pawth ? pawth.balance : '0'
    const currentChainPawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0
    const currentChainPawthTransfers = ERC20Transfers.filter(t => t.address === pawthAddress) || []

    const chainData = {
      '0x1': {
        balance: ethPawthBalance,
        transfers: ethPawthTransfers,
        price: ethPriceData?.usdPrice || 0
      },
      '0x38': {
        balance: bscPawthBalance,
        transfers: bscPawthTransfers,
        price: bscPriceData?.usdPrice || 0
      },
    }

    const multichainBalance = bscPawthBalance + ethPawthBalance
    const multichainTransfers = ethPawthTransfers.concat(bscPawthTransfers)
    const multichainPrice = (chainData['0x1'].price + chainData['0x38'].price) / 2 // avg price

    const pawthBalance = globalContext.multichainEnabled ? multichainBalance : chainData[chainId]?.balance || currentChainPawthBalance
    const pawthTransactions = globalContext.multichainEnabled ? multichainTransfers : chainData[chainId]?.transfers || currentChainPawthTransfers
    const price = globalContext.multichainEnabled ? multichainPrice : chainData[chainId]?.price || 0
    setPrice(price)

    let totalIn = 0.0, totalOut = 0.0

    const startBlockReflectionsOff = 13690729
    const endBlockReflectionsOff = 13953541
    const startBlockReflectionsOnePercent = endBlockReflectionsOff
    
    const isEth = chainId === '0x1'
  
    const isEthReflectionsOnePercent = (tx) => {
      const reflectionsOnePercent = parseInt(tx.block_number) >= startBlockReflectionsOnePercent
      return isEth && reflectionsOnePercent
    }
  
    const isEthReflectionsOff = (tx) => {
      const reflectionsOff = parseInt(tx.block_number) > startBlockReflectionsOff &&
                             parseInt(tx.block_number) <= endBlockReflectionsOff
      return isEth && reflectionsOff
    }
  
    for (const tx of pawthTransactions) {
      if (tx.to_address === account) {
        totalIn += parseFloat(tx.value)
      } else if (isEthReflectionsOnePercent(tx)) {
        totalOut += parseFloat(tx.value)
        totalOut += parseFloat(tx.value) * 0.01
      } else if (isEthReflectionsOff(tx)) {
        totalOut += parseFloat(tx.value)
      } else {
        totalOut += parseFloat(tx.value)
        totalOut += parseFloat(tx.value) * 0.02
      }
    }
  
    totalIn = totalIn / 10**9
    totalOut = totalOut / 10**9
  
    let balanceWithoutReflections = totalIn - totalOut
    const reflections = pawthBalance ? parseInt(pawthBalance - balanceWithoutReflections) : 0
    
    if (balanceWithoutReflections < 0) {
      balanceWithoutReflections = 0
    }
    setBalanceWithoutReflections(balanceWithoutReflections)
    setTotalIn(totalIn)
    setTotalOut(totalOut)
    setReflections(reflections)
  }, [globalContext.multichainEnabled, chainId, assets, bscAssets, ethAssets, ethERC20Transfers, bscERC20Transfers, ERC20Transfers])

  // const pawthTransactions = ERC20Transfers ? ERC20Transfers.filter(t => t.address === pawthAddress) : []

  // function getChainNameById (chainId) {
  //   switch (chainId) {
  //     case '0x1':
  //       return 'eth'
  //     case '0x38':
  //       return 'bsc'
  //     default:
  //       return 'eth'
  //   }
  // }

  // const { data: priceData } = useTokenPrice({
  //   address: pawthAddress || PAWTH_ADDRESS['0x1'],
  //   chain: getChainNameById(chainId)
  // })

  // const price = priceData ? priceData.usdPrice : 0

  // let totalIn = 0.0, totalOut = 0.0

  // const startBlockReflectionsOff = 13690729
  // const endBlockReflectionsOff = 13953541
  // const startBlockReflectionsOnePercent = endBlockReflectionsOff
  
  // const isEth = chainId === '0x1'

  // const isEthReflectionsOnePercent = (tx) => {
  //   const reflectionsOnePercent = parseInt(tx.block_number) >= startBlockReflectionsOnePercent
  //   return isEth && reflectionsOnePercent
  // }

  // const isEthReflectionsOff = (tx) => {
  //   const reflectionsOff = parseInt(tx.block_number) > startBlockReflectionsOff &&
  //                          parseInt(tx.block_number) <= endBlockReflectionsOff
  //   return isEth && reflectionsOff
  // }


  // for (const tx of pawthTransactions) {
  //   if (tx.to_address === account) {
  //     totalIn += parseFloat(tx.value)
  //   } else if (isEthReflectionsOnePercent(tx)) {
  //     totalOut += parseFloat(tx.value)
  //     totalOut += parseFloat(tx.value) * 0.01
  //   } else if (isEthReflectionsOff(tx)) {
  //     totalOut += parseFloat(tx.value)
  //   } else {
  //     totalOut += parseFloat(tx.value)
  //     totalOut += parseFloat(tx.value) * 0.02
  //   }
  // }

  // totalIn = totalIn / 10**9
  // totalOut = totalOut / 10**9

  // let balanceWithoutReflections = totalIn - totalOut
  // const reflections = pawthBalance ? parseInt(pawthBalance - balanceWithoutReflections) : 0
  
  // if (balanceWithoutReflections < 0) {
  //   balanceWithoutReflections = 0
  // }

  if (!account) {
    return (
      <div style={styles.card}>
        <div style={styles.tranfer}>
          <div style={styles.header}>
            <h3>Your $PAWTH Reflections</h3>
          </div>
          <div style={styles.row}>
            <Account />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Your $PAWTH Reflections</h3>
        </div>
        <Skeleton loading={!ERC20Transfers}>
          <Row gutter={16}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Total $PAWTH In" 
                value={totalIn.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}/>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Total $PAWTH Out" 
                value={totalOut.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}/>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Reflections" 
                value={reflections.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}/>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Reflections $ Value" 
                value={'$' + (reflections * price).toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })}/>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Statistic 
                title="Balance Without Reflections" 
                value={balanceWithoutReflections.toLocaleString([], { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}/>
            </Col>
          </Row>
        </Skeleton>
      </div>
    </div>
  );
}

export default Reflections