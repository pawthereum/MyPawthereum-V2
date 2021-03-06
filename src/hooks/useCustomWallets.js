
import { useEffect, useState } from 'react'
import { PAWTH_CHARITY_WALLET } from '../constants'
import { useMoralis } from 'react-moralis'

const API_ENDPOINT = `https://api.getchange.io/api/v1/nonprofits?public_key=${process.env.REACT_APP_CHANGE_API_KEY}&search_term=`

export const getCharityByCustomWallet = async (customWallet) => {
  // custom wallet must be checksummed when calling this function
  const response = await fetch(
    `https://api.getchange.io/api/v1/nonprofits/wallet/${customWallet}?public_key=${process.env.REACT_APP_CHANGE_API_KEY}`
  )
  return await response.json()
}

const useGetCustomWallets = (searchQuery, selectedCategories) => {
  const { chainId } = useMoralis()
  
  if (selectedCategories.length > 0 && !searchQuery) {
    searchQuery = ''
  }
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
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
            stats: n.stats && n.stats.length > 0 ? n.stats : null
          }
          return wallet
        })
        const pawthCharity = {
          address: PAWTH_CHARITY_WALLET[chainId],
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