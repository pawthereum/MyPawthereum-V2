import { Row, Col, Card } from 'antd'
import PoolDeposit from './components/PoolDeposit'
import PoolClaim from './components/PoolClaim'

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
}

function Pool() {
  return (
    <Card style={styles.card} title="Staking Pool">
      <Row>
        <Col>Staking Pool</Col>
      </Row>
      <PoolDeposit />
      <PoolClaim />
    </Card>
  );
}

export default Pool;