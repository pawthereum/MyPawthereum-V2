
import { useEffect, useState } from 'react'
import { PAWTH_CHARITY_WALLET } from '../constants'

const API_ENDPOINT = `https://api.getchange.io/api/v1/nonprofits?public_key=${process.env.REACT_APP_CHANGE_API_KEY}&search_term=`

const useGetCustomWallets = (searchQuery, selectedCategories) => {
  console.log({
    searchQuery,
    selectedCategories
  })
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching...')
      try {
        let categoryString = ''
        if (selectedCategories?.length > 0) {
          categoryString = '&categories[]='
          selectedCategories.forEach((c,i) => {
            if (i === 0) {
              categoryString += c
            } else {
              categoryString += '\u0026categories[]=' + c
            }
          })
        }
        const response = await fetch(API_ENDPOINT + searchQuery + categoryString)
        const json = await response.json()
        console.log('JSON~~~~~~~~~~~~~~~~~', json)
        const wallets = json.nonprofits.filter(n => n.crypto.ethereum_address).map(n => {
          const wallet = {
            address: n.crypto.ethereum_address,
            symbol: n.socials.twitter || n.socials.instagram || n.name.match(/[A-Z]/g).join(''), // fallback to abbr.
            name: n.name,
            icon: n.icon_url,
            logo: n.logo_url,
            mission: n.mission,
            category: n.category,
            website: n.website,
            facebook: n.socials.facebook,
            instagram: n.socials.instagram,
            twitter: n.socials.twitter,
            impact: n.display_impact ? n.display_impact[0] : null
          }
          return wallet
        })
        const pawthCharity = {
          address: PAWTH_CHARITY_WALLET,
          symbol: 'PAWTH Charity',
          name: 'Pawthereum Charity Wallet',
          logo: 'https://pawthereum.github.io/Pancakeswap/images/right-supercat.svg',
          icon: 'https://pawthereum.com/wp-content/uploads/shared-files/pawth-logo-transparent.png',
          mission: 'Pawthereum is a decentralized, community-run charity cryptocurrency project that gives back to animal shelters and advocates for the well-being of animals in need!',
          category: 'animals',
          website: 'https://pawthereum.com',
          twitter: '@pawthereum',
          facebook: 'pawthereum',
          instagram: 'pawthereum',
          impact: 'Almost half a million dollars donated to animal shelters!',
          isFeatured: true
        }
        wallets.unshift(pawthCharity)
        const formattedJson = {
          nonprofits: wallets,
          page: json.page
        }

        setData(formattedJson)
      } catch (error) {
        console.error('Unable to fetch custom wallet data:', error)
      }
    }

    fetchData()
  }, [setData, searchQuery, selectedCategories])

  return data?.nonprofits
}

export default useGetCustomWallets