import useBreakpoint from 'hooks/useBreakpoint';
import { Row, Col, Card } from 'antd'

function DexComingSoon(props) {
  const { isMobile } = useBreakpoint()

  const styles = {
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: isMobile ? "400px" : "640px",
      fontSize: "16px",
      fontWeight: "500",
      textAlign: 'center'
    },
    header: {
      padding: "10px",
      paddingBottom: "20px",
    }
  };
  return (
    <Card style={styles.card}>
      <div style={styles.header}>
        <h3>PawSwap</h3>
      </div>
      <Row style={{ textAlign: 'center' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          PawSwap is coming soon...
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <a href="https://blog.pawthereum.com/a-peek-behind-the-curtain-of-pawswap-a-dex-by-pawthereum-d02aac16c05b">
          Read more
          </a>
        </Col>
      </Row>
    </Card>
  );
}

export default DexComingSoon