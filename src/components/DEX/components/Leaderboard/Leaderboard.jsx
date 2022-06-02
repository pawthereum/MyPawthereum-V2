import { Row, Col, Card} from 'antd';
import { COLORS } from '../../../../constants';
import useLeaderboard from 'hooks/useLeaderboard';
import useNative from 'hooks/useNative';

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  inset: {
    backgroundColor: COLORS.defaultBg,
    padding: '14px',
    borderRadius: '1rem',
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}

function Leaderboard () {
  const { charityLeaderBoard } = useLeaderboard()
  const { nativeSymbol } = useNative()
  console.log({ charityLeaderBoard })

  return (
    <Card style={styles.card} title={<div>Leaderboard</div>}>
      <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Col span={12}><strong>Charity</strong></Col>
        <Col span={12}style={{ display: 'flex', justifyContent: 'end' }}>
          <strong>{nativeSymbol} Donated</strong>
        </Col>
      </Row>
      {charityLeaderBoard.map((c, i) => (
        <Row key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Col span={12}>{c.charityData.name || 'Unknown Charity'}</Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <div>{c.totalReceived.toSignificant(18)}</div>
          </Col>
        </Row>
      ))}
    </Card>
  )
}

export default Leaderboard