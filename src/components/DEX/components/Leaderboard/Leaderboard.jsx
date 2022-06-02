import { Row, Col, Card, List, Divider, Grid } from 'antd';
import { COLORS } from '../../../../constants';
import useLeaderboard from 'hooks/useLeaderboard';
import useNative from 'hooks/useNative';

const { useBreakpoint } = Grid;

function Leaderboard () {
  const { charityLeaderboard, tokenLeaderboard } = useLeaderboard()
  const { nativeSymbol } = useNative()
  const screens = useBreakpoint()

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
      <Divider>Most Charitable Community</Divider>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={tokenLeaderboard}
        renderItem={(token, i) => (
          <List.Item
            key={token.address}
            extra={
              !token.tokenData?.metadata?.logoURI ? '' :
              <img
                width={100}
                alt={token.tokenData?.token?.name || 'token logo'}
                src={token.tokenData?.metadata?.logoURI}
              />
            }
          >
            <List.Item.Meta
              avatar={<div>#{i + 1}</div>}
              title={token.tokenData?.token?.name || 'Unknown Token'}
              description={token.tokenData?.metadata?.description || ''}
            />
            <div style={{ marginLeft: '32px' }}>
              <span>
                {token.totalDonated.toSignificant(6)} {nativeSymbol} donated in {token.donations?.length} donations
              </span>
            </div>
          </List.Item>
        )}
      />
      <Divider>Most Donations Received</Divider>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={charityLeaderboard}
        renderItem={(charity, i) => (
          <List.Item
            key={charity.address}
            extra={
              !charity.charityData?.logo_url ? '' :
              <img
                width={100}
                alt={charity.charityData?.name || 'charity logo'}
                src={charity.charityData?.logo_url}
              />
            }
          >
            <List.Item.Meta
              avatar={<div>#{i + 1}</div>}
              title={charity.charityData?.name || 'Unknown Charity'}
              description={charity.charityData?.mission || ''}
            />
            <div style={{ marginLeft: '32px' }}>
              <span>
                {charity.totalReceived.toSignificant(6)} {nativeSymbol} received in {charity.donations?.length} donations
              </span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default Leaderboard