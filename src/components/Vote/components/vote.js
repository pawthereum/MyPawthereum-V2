export async function getProposals (space) {
  console.log('SPACE', space)
  return fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          proposals (
            first: 1000000,
            skip: 0,
            where: {
              space_in: ["${space}"]
            },
            orderBy: "created",
            orderDirection: desc
          ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
        }      
      `,
    }),
  })
  .then((res) => res.json())
  .then((result) => {
    console.log('result', result)
    const proposals = result.data ? result.data.proposals : []
    return proposals
  })
}

export async function getProposal (id) {
  return fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          proposal(id:"${id}") {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            created
            plugins
            network
            link
            discussion
            type
            strategies {
              name
              params
            }
            space {
              id
              name
            }
          }
        }    
      `,
    }),
  })
  .then((res) => res.json())
  .then((result) => {
    return result.data.proposal
  })
}

export async function getProposalVotes (proposal) {
  return fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query Votes {
          votes (
            first: 1000000
            skip: 0
            where: {
              proposal: "${proposal}"
            }
            orderBy: "created",
            orderDirection: desc
          ) {
            id
            voter
            created
            choice
            space {
              id
              name
            }
          }
        }   
      `,
    }),
  })
  .then((res) => res.json())
  .then((result) => {
    const votes = result.data ? result.data.votes : []
    return votes
  })
}

export async function getProposalVoteScores(
  space,
  strategies,
  network,
  addresses,
  snapshot,
) {
  if (!snapshot) {
    snapshot = 'latest'
  }
  const scoreApiUrl = 'https://score.snapshot.org/api/scores'
  try {
    const params = {
      space,
      strategies,
      network,
      addresses,
      snapshot
    }
    const res = await fetch(scoreApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ params })
    });
    const obj = await res.json();
    return obj.result.scores[0]
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getVoterStatus(account, space) {
  return fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query Votes {
          votes (
            first: 10000
            skip: 0
            where: {
              space_in: ["${space}"]
            },
            orderBy: "created",
            orderDirection: desc
          ) {
            voter
          }
        }        
      `,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      const votes = result.data ? result.data.votes : []
      const voters = Object.entries(votes).map(v => v[1].voter)
      return voters.includes(account)
    })
}
