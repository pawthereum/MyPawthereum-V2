import { React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useMoralis, useERC20Balances } from "react-moralis";
import { getProposal, getProposalVotes, getProposalVoteScores } from './vote'
import { PAWTH_ADDRESS, DISQUS_ID } from '../../../constants'
import { Alert, Badge, Button, Card, Progress, Spin, Table, Tag, Skeleton, notification } from "antd";
import { NavLink } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown';
import { DiscussionEmbed } from 'disqus-react' 
import { hexlify } from '@ethersproject/bytes'
import fetch from 'node-fetch'
import useBreakpoint from "hooks/useBreakpoint";

const openNotification = ({ message, description, link }) => {
  notification.open({
    message,
    description,
    onClick: () => {
      if (!link) return
      window.location.href = link
    },
    placement: 'topRight'
  });
};

async function signMessage(web3, msg, address) {
  msg = hexlify(new Buffer(msg, 'utf8'));
  return await web3.send('personal_sign', [msg, address]);
}

function Proposal(props) {
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
      gap: "10px",
      flexDirection: "row",
      width: '100%',
    },
    rowWithColumns: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "start",
      textAlign: "center",
      justifyContent: "space-between",
      gap: "10px",
      flexDirection: "row",
      paddingBottom: "10px",
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
    choiceCard: {
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: "47.5%",
      fontSize: "16px",
      fontWeight: "500",
    }
  };

  const { account, chainId, Moralis } = useMoralis();
  const { id } = useParams();
  const [proposal, setProposal] = useState({ choices: [] })
  const [deadlineText, setDeadlineText] = useState(null)
  const [votes, setVotes] = useState([])
  const [results, setResults] = useState([
    { choice: 'Loading...', votes: 0 },
    { choice: 'Loading...', votes: 0 },
  ])
  const [userVote, setUserVote] = useState(null)
  const [canVoteOnProposal, setCanVoteOnProposal] = useState(false)
  const [disqusConfig, setDisqusConfig] = useState({})

  const [disabledButtons, setDisabledButtons] = useState({})
  const [loadingButtons, setLoadingButtons] = useState({}) 

  const { data: assets } = useERC20Balances(props);
  const pawthAddress = PAWTH_ADDRESS[chainId]
  const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
  const pawthBalanceRaw = pawth ? pawth.balance : '0'
  const pawthBalance = pawth ? parseInt(pawthBalanceRaw) / 10**parseInt(pawth.decimals) : 0

  async function vote(i) {
    // set loading
    let loadingButtonUpdate = {}
    loadingButtonUpdate[i] = true
    setLoadingButtons(loadingButtonUpdate)

    // set disabled
    let disabledButtonUpdate = {}
    for (let k = 0; k <= results.length; k++) {
      if (i !== k) {
        disabledButtonUpdate[k] = true
      }
    }
    setDisabledButtons(disabledButtonUpdate)

    try {
      const web3Provider = await Moralis.enableWeb3();
      const msg = {
        version: '0.1.3',
        timestamp: (Date.now() / 1e3).toFixed(),
        space: proposal.space.id,
        type: 'vote',
        payload: {
          proposal: proposal.id,
          choice: i + 1,
          metadata: {}
        }
      }
      const sig = await signMessage(web3Provider._provider, JSON.stringify(msg), account)
      await fetch('https://hub.snapshot.org/api/message', {
        method: 'POST',
        body: JSON.stringify({
          address: account,
          msg: JSON.stringify(msg),
          sig: sig.result
        }),
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      console.log('error', err)
      return openNotification({
        message: "⚠️ Vote Error!",
        description: `There was a problem submitting your vote. Try submitting on Snapshot.org`,
        link: `https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`
      });
    }

    // fetch the proposal now that we've voted
    await fetchProposal()
    // no more loading buttons
    setLoadingButtons({})
    // no more disabled buttons
    setDisabledButtons({})
    // pop up success
    openNotification({
      message: "🎉 Vote Submitted!",
      description: `Thank you for making your voice heard... roar!`
    });
  }

  useEffect(() => {
    fetchProposal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!proposal || !proposal.space) {
      return setDeadlineText(null)
    }

    // set the deadline text
    const now = new Date()
    const endDate = new Date(proposal.end * 1000)
    const timeOpts = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }
    const votingEnded = now.getTime() >= proposal.end * 1000
    if (votingEnded) {
      setDeadlineText(`Voting ended ${endDate.toLocaleString([], timeOpts)}`)
    } else {
      setDeadlineText(`Voting ends approximately ${endDate.toLocaleString([], timeOpts)}`)
    }

    // get the votes
    tallyVotes()

    // set disqus config
    setDisqusConfig({
      url: 'https://my.pawthereum.com/#/vote/' + proposal.id,
      identifier: proposal.id,
      title: proposal.title,
    })
  

    async function tallyVotes() {
      const proposalVotes = await getProposalVotes(id)
      setVotes(proposalVotes)
      const voterAddresses = proposalVotes.map(v => v.voter)
      const proposalVoteScores = await getProposalVoteScores(
        proposal.space.id,
        proposal.strategies,
        proposal.network,
        voterAddresses,
        parseInt(proposal.snapshot)
      )

      let totalTokensInVote = 0
      for (const balance in proposalVoteScores) {
        totalTokensInVote += proposalVoteScores[balance]
      }

      let proposalProgress = {}
      let proposalCounts = {}
      for (const choice in proposal.choices) {
        proposalProgress[proposal.choices[choice]] = 0
        proposalCounts[proposal.choices[choice]] = 0
      }

      for (const vote of proposalVotes) {
        const choice = proposal.choices[vote.choice - 1]
        proposalProgress[choice] += proposalVoteScores[vote.voter]
        proposalCounts[choice]++
      }

      let proposalProgressArray = []
      for (const [choice, votes] of Object.entries(proposalProgress)) {
        proposalProgressArray.push({ choice, votes })
      }

      const proposalStrategy = proposal.strategies[0].name
      proposalProgressArray = proposalProgressArray.map(p => {
        const onePawthOneVote = proposalStrategy === 'erc20-balance-of' || proposalStrategy === 'multichain'
        const votingPowerType = onePawthOneVote ? totalTokensInVote : p.votes.length
        if (p.votes === 0) {
          p.percentage = '0'
          return p
        }
        p.count = proposalCounts[p.choice] ? proposalCounts[p.choice] : 0
        p.percentage = (p.votes / votingPowerType * 100).toFixed(2)
        return p
      })

      setResults(proposalProgressArray)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal])

  useEffect(() => {
    determineUserVote()

    async function determineUserVote () {
      const hasVoted = votes.find(v => v.voter.toLowerCase() === account) ? true : false
  
      if (hasVoted) {
        const usersVote = votes.find(v => v.voter.toLowerCase() === account)
        setUserVote(proposal.choices[usersVote.choice - 1])
      }
  
      const hasPawth = pawthBalance !== undefined && pawthBalance.toFixed(2) !== '0.00'
      setCanVoteOnProposal(hasPawth && proposal.state === 'active')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votes, assets])

  async function fetchProposal () {
    const proposal = await getProposal(id)
    setProposal(proposal)
  }

  const roundBig = (number) => {
    if (!number) return 0

    return Math.abs(Number(number)) >= 1.0e+9
    
    ? (Math.abs(Number(number)) / 1.0e+9).toPrecision(4) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(number)) >= 1.0e+6

    ? (Math.abs(Number(number)) / 1.0e+6).toPrecision(4) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(number)) >= 1.0e+3

    ? (Math.abs(Number(number)) / 1.0e+3).toPrecision(4) + "K"

    : Math.abs(Number(number));
  }

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

  const tableColumns = [
    {
      title: 'Address',
      dataIndex: 'voter',
      key: 'voter',
      render: (voter) => voter.substring(0,6) + '...' + voter.substring(voter.length - 6),
    },
    {
      title: 'Vote',
      dataIndex: 'choice',
      key: 'choice',
      render: (choice) => proposal.choices[choice - 1],
    },
  ]


  const isUserVote = (index) => {
    console.log('proposal is', proposal)
    console.log('proposal.choices[index]', proposal.choices[index])
    console.log('userVote', userVote)
    console.log('index', index)
    return proposal.choices[index] === userVote
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ ...styles.row, marginBottom: '10px', alignItems: 'start', justifyContent: 'start'}}>
        <NavLink to="/vote">
          <LeftOutlined /> All Proposals
        </NavLink>
      </div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <div style={styles.row}>
            <div>
              <h3>{proposal.title}</h3>
            </div>
            <div style={styles.justifyEnd}>
              <Tag color={statusColor(proposal.state)}>
                {proposal.state}
              </Tag>
            </div>
          </div>
          <div style={styles.row}>
            <Skeleton loading={!deadlineText}>
              <small>{deadlineText}</small>
            </Skeleton>
          </div>
          <div style={{...styles.row, marginTop: '20px' }}>
            <h4>Results</h4>
          </div>
          <div style={styles.rowWithColumns}>
            {
              !results.length ? <Spin /> :
              results.map((r, i) => {
                return (
                  <Card style={styles.choiceCard} key={i}>
                    <div style={styles.row}>
                      {r.choice}
                    </div>
                    <div style={styles.rowWithColumns}>
                      <div>
                        <small>{roundBig(r.votes).toLocaleString({}, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0
                        })} PAWTH</small>
                      </div>
                      <div>
                        <small>{roundBig(r.count)} Votes</small>
                      </div>
                    </div>
                    <div style={styles.row}>
                      <Progress percent={r.percentage} status={proposal.state} />
                    </div>
                    {
                        canVoteOnProposal
                        ?
                          <div style={{ ...styles.row, marginTop: '20px' }}>
                            <Button
                              type="primary" 
                              block 
                              loading={loadingButtons[i]}
                              disabled={disabledButtons[i] || isUserVote(i)}
                              onClick={() => vote(i)}
                            >
                              { isUserVote(i) ? 'Voted' : 'Vote' }
                            </Button>
                          </div>
                        :
                          ''
                      }
                  </Card>
                )
              })
            }
          </div>
          <div style={{ marginTop: '20px' }}>
            <h4>Description</h4>
            <small>
              <ReactMarkdown children={proposal.body} />
            </small>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h4>
              Votes
              <Badge
                className="site-badge-count-109"
                count={votes.length}
                overflowCount={999}
                offset={[5, -2.5]}
                style={{ backgroundColor: "grey" }}
                title="Number of holders who voted"
              />
            </h4>
            <Skeleton loading={!votes}>
              <Table
                dataSource={votes}
                columns={tableColumns}
                rowKey={(record) => {
                  return record.voter;
                }}
              />
            </Skeleton>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h4>Discussion</h4>
            {
              disqusConfig.identifier !== '' ? (
                <div>
                  <Alert
                    message="Beware of scammers. The Pawthereum team will never ask you for your seedphrase or any other credentials!"
                    type="warning"
                    closable
                  />
                  <DiscussionEmbed
                    shortname={DISQUS_ID}
                    config={disqusConfig}
                  />
                </div>
            ) : ''}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Proposal;
