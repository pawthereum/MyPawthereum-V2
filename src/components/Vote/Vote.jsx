import { useEffect, useState } from "react";
import snapshot from '@snapshot-labs/snapshot.js'
import {
  getProposals
} from './components/vote'
import { SNAPSHOT_URL } from '../../constants'
import { Card, Spin, Tag } from "antd";
import { NavLink } from "react-router-dom";
import useBreakpoint from "hooks/useBreakpoint";

console.log('snapshot', snapshot)
const hubUrl = 'https://hub.snapshot.org';
const Snapshot = new snapshot.Client(hubUrl);
console.log('SNAPSHOT', Snapshot)


let fetchedProposals = false

function Vote() {
  const { isMobile } = useBreakpoint()

  const styles = {
    title: {
      fontSize: "30px",
      fontWeight: "600",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      flexDirection: "row",
      width: '100%',
    },
    marginRight: {
      marginRight: '1rem'
    },
    justifyEnd: {
      marginLeft: 'auto',
      marginRight: 0,
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: isMobile ? "400px" : "640px",
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  const [proposals, setProposals] = useState([])

  useEffect(() => {
    if (!fetchedProposals || !proposals.length) {
      fetchProposals()
    }
    async function fetchProposals () {
      fetchedProposals = true
      console.log('---SNAPSHOT_URL---', SNAPSHOT_URL)
      const proposals = await getProposals(SNAPSHOT_URL)
      console.log('proposals', proposals)
      setProposals(proposals)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const statusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'pending':
        return 'blue'
      default:
        return null
    }
  }

  return (
    <div>
      {
        proposals.length
        ?
          proposals.map((p, i) => {
            return (
              <div style={{ ...styles.row, marginBottom: '10px'}} key={i}>
                <NavLink to={`/vote/${p.id}`}>
                  <Card style={styles.card}>
                    <div style={styles.row}>
                      <div style={styles.marginRight}>
                        {proposals.length - i}
                      </div>
                      <div>
                        {p.title}
                      </div>
                      <div style={styles.justifyEnd}>
                        <Tag color={statusColor(p.state)}>
                          {p.state}
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </NavLink>
              </div>
            )
          })
        :
          <Spin />
      }
    </div>
  );
}

export default Vote;
