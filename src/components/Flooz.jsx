import React from "react";
import { useMoralis } from "react-moralis";
import { Alert, Card } from "antd";

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "640px",
    fontSize: "16px",
    fontWeight: "500",
    backgroundColor: '#212429',
  },
  row: {
    marginBottom: '10px'
  },
}

function Flooz() {
  const { chainId } = useMoralis()

  return (
    <div style={styles.row}>
      {
        chainId === '0x1'
        ?
          <div style={styles.row}>
            <Alert
              message="The Ethereum network has much higher gas fees than the Binance Smart Chain!"
              type="warning"
              closable
            />
          </div>
        : ''
      }
      <Card style={styles.card}>
        {
          chainId === '0x1'
          ?
            <iframe title="Flooz Trade" 
              src="https://www.flooz.trade/embedded/0xaecc217a749c2405b5ebc9857a16d58bdc1c367f/?refId=EUcDSp&amp;backgroundColor=transparent&amp;chainId=1" 
              width="100%" 
              height="700" 
              frameBorder="0"
              loading="lazy"
            ></iframe>
          :
            <iframe 
              title="Flooz Trade" 
              src="https://www.flooz.trade/embedded/0x409e215738e31d8ab252016369c2dd9c2008fee0/?refId=EUcDSp&amp;backgroundColor=transparent&amp;chainId=56" 
              width="100%"
              height="756" 
              frameBorder="0"
              loading="lazy"
            ></iframe>
        }
      </Card>
    </div>
  );
}

export default Flooz;
