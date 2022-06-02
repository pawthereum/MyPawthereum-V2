import { Row, Col, Card, List, Divider, Grid } from 'antd';
import { COLORS } from '../../../../constants';
import useLeaderboard from 'hooks/useLeaderboard';
import useNative from 'hooks/useNative';

const { useBreakpoint } = Grid;

const styles = {
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
  const screens = useBreakpoint()
  console.log({ charityLeaderBoard })

  const dynamicStyles = {
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "2rem",
      width: screens.xs ? "400px" : "640px",
      fontSize: "16px",
      fontWeight: "500",
    },
  }

  return (
    <Card style={dynamicStyles.card} title={<div>Leaderboard</div>}>
      {/* <Row style={{ marginBottom: '5px' }}>
        <Col>Most Donated Charities</Col>
      </Row>
      <div style={{ ...styles.inset, fontSize: '0.9em' }}>
        <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Col span={12}><strong>Charity</strong></Col>
          <Col span={12}style={{ display: 'flex', justifyContent: 'end' }}>
            <strong>{nativeSymbol} Donated</strong>
          </Col>
        </Row>
        {charityLeaderBoard.map((c, i) => (
          <Row key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Col span={16}>{c.charityData.name || 'Unknown Charity'}</Col>
            <Col span={8} style={{ display: 'flex', justifyContent: 'end' }}>
              <div>{c.totalReceived.toSignificant(9)}</div>
            </Col>
          </Row>
        ))}
      </div> */}
      <Divider>Most Donated</Divider>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={charityLeaderBoard}
        renderItem={charity => (
          <List.Item
            key={charity.address}
            extra={
              !charity.charityData?.logo_url ? '' :
              <img
                width={100}
                alt="logo"
                src={charity.charityData?.logo_url}
              />
            }
          >
            <List.Item.Meta
              title={charity.charityData?.name || 'Unknown Charity'}
              description={charity.charityData?.mission || ''}
            />
            {charity.totalReceived.toSignificant(6)} {nativeSymbol} received in {charity.donations?.length} donations
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Leaderboard