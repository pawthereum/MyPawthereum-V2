import { useState } from 'react'
import { Row, Col, Card, Button, Divider } from 'antd'
import TaxManagementForm from './Listing/TaxManagementForm'
import { ArrowLeftOutlined } from '@ant-design/icons';
import NewListing from './Listing/NewListing';

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "2rem",
    width: "400px",
    fontSize: "16px",
    fontWeight: "500",
  },
  outset: {
    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px',
  }
}


function ListToken () {

  const [manageTokenIsVisible, setManageTokenIsVisible] = useState(false)

  const showManageToken = () => {
    setManageTokenIsVisible(true)
  }

  const hideManageToken = () => {
    setManageTokenIsVisible(false)
  }

  const CardHeader = () => (
    <Row style={{ display: 'flex', alignItems: 'center' }}>
      <Col span={!manageTokenIsVisible ? 12  : 8 }>
        {
          !manageTokenIsVisible ? `List New Token` :
          <ArrowLeftOutlined 
            style={{ cursor: 'pointer', marginRight: '0.5rem' }} 
            onClick={() => hideManageToken()} 
          />
        }
      </Col>
      {
        !manageTokenIsVisible ? '' :
        <Col span={8}>
          Manage Listing
        </Col>
      }
    </Row>
  )

  return (
    <div>
      <Row>
        <Col>
          <Card style={styles.card} title={<CardHeader />}>
            
            {
              manageTokenIsVisible ?  <TaxManagementForm /> :
              <>
                <Row>
                  <Col span={24}>
                    <NewListing />
                  </Col>
                </Row>
                <Divider 
                  orientation="left"
                  style={{ marginTop: '50px' }}
                >Your Listings</Divider>
                <Row>
                  <Col span={24}>
                    <Button
                      size="large"
                      style={{
                        width: "100%",
                        borderRadius: "0.6rem",
                        height: "50px",
                        marginTop: "10px",
                        ...styles.outset,
                      }}
                      onClick={() => showManageToken()}
                    >
                      Manage Listings
                    </Button>
                  </Col>
                </Row>
              </>
            }
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ListToken