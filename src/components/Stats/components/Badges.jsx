import { useMoralis, useERC20Balances } from 'react-moralis'
import { Row, Col } from "antd";
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, Timestamp } from 'firebase/firestore'
import { PAWTH_ADDRESS, DECIMALS, SHIBA_LP_ADDRESS, UNI_LP_ADDRESS, SNAPSHOT_URL } from '../../../constants'
import { PAWTH_ABI } from '../../../constants/abis/pawth'
import useNativeTransactions from 'hooks/useNativeTransactions'
import { useERC20Transfers } from "hooks/useERC20Transfers"
import { getVoterStatus } from '../../Vote/components/vote'
import useBreakpoint from "hooks/useBreakpoint";

import swap from '../../../assets/images/badges/swap.png'
import vote from '../../../assets/images/badges/vote.png'
import diamondPaws from '../../../assets/images/badges/diamondPaws.png'
import fist from '../../../assets/images/badges/fist.png'
import wildcat from '../../../assets/images/badges/wildcat.png'
import bug from '../../../assets/images/badges/bug.png'
import catDay from '../../../assets/images/badges/catDay.png'
import shibaInuLp from '../../../assets/images/badges/shibaInuLp.png'
import uniLp from '../../../assets/images/badges/uniLp.png'
import heartSparkle from '../../../assets/images/badges/heartSparkle.png'
import edinburgh from '../../../assets/images/badges/edinburgh.png'
import redCandle from '../../../assets/images/badges/redCandle.png'
import slurp from '../../../assets/images/badges/slurp.png'
import paws from '../../../assets/images/badges/paws.png'
import cart from '../../../assets/images/badges/cart.png'
import givingTuesday from '../../../assets/images/badges/givingTuesday.png'
import twelveDaysOfGiving from '../../../assets/images/badges/twelveDaysOfGiving.png'
import newtown from '../../../assets/images/badges/newtown.png'
import koreanK9Rescue from '../../../assets/images/badges/koreanK9Rescue.png'
import catTown from '../../../assets/images/badges/catTown.png'
import forgottenAnimals from '../../../assets/images/badges/forgottenAnimals.png'
import muttville from '../../../assets/images/badges/muttville.png'
import globalSanctuaryElephants from '../../../assets/images/badges/globalSanctuaryElephants.png'
import dogsForBetterLvies from '../../../assets/images/badges/dogsForBetterLives.png'
import theRealBark from '../../../assets/images/badges/theRealBark.png'
import mauiHumaneSociety from '../../../assets/images/badges/mauiHumaneSociety.png'
import savasSafeHaven from '../../../assets/images/badges/savasSafeHaven.png'
import slothConservationFoundation from '../../../assets/images/badges/slothConservationFoundation.png'
import northShoreAnimalLeague from '../../../assets/images/badges/northShoreAnimalLeague.png'
import bridge from '../../../assets/images/badges/bridge.png' 
import perrysPlace from '../../../assets/images/badges/heavenOnEarth.png'
import safemoonswap from '../../../assets/images/badges/safemoonswap.png'
import dog from '../../../assets/images/badges/dog.png'
import lovablePaws from '../../../assets/images/badges/lovablePaws.jpeg'

import {
  BRIDGE_TESTERS,
  BUG_SQUISHERS,
  CAT_DAY_VISITORS,
  EDINBURGH_VISITORS,
  ORIGINAL_SWAPPERS,
  PAWS_ORG_VISITORS,
  RED_CANDLE_SURVIVORS,
} from './badges'

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  badgeCard: {
    maxHeight: "500px",
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    '&::before': {
      content:`''`,
      width:'100%',
      height:'100%',    
      position:'absolute',
      left:0,
      top:0,
      background:`linear-gradient(transparent '4000px', white)`
    },
    '&::WebkitScrollbar': {
      display: 'none'
    }
  },
  header: {
    padding: "10px",
    paddingBottom: "20px",
  }
};

function Badges(props) {
  const { Moralis, account, chainId } = useMoralis()
  const [visits, setVisits] = useState([])
  const { data: assets } = useERC20Balances()
  const { nativeTransactions } = useNativeTransactions()
  const { ERC20Transfers } = useERC20Transfers()
  const { isMobile } = useBreakpoint()
  const [tokenBalance, setTokenBalance] = useState(0)

  const [isOriginalSwapper, setIsOriginalSwapper] = useState(false)
  const [isDiamondHands, setIsDiamondHands] = useState(false)
  const [isVoter, setIsVoter] = useState(false)
  const [isHolder, setIsHolder] = useState(false)
  const [isInWildCatClub, setIsInWildCatClub] = useState(false)
  const [isBugSquisher, setIsBugSquisher] = useState(false)
  const [isCatDayVisitor, setIsCatDayVisitor] = useState(false)
  const [isMarketingDonor, setIsMarketingDonor] = useState(false)
  const [isEdinburghEventVisitor, setIsEdinburghEventVisitor] = useState(false)
  const [isRedCandleSurvivor, setIsRedCandleSurvivor] = useState(false)
  const [isNov18Slurper, setIsNov18Slurper] = useState(false)
  const [isPawsOrgEventVisitor, setIsPawsOrgEventVisitor] = useState(false)
  const [isBlackFurday2021Buyer, setIsBlackFurday2021Buyer] = useState(false)
  const [isGivingTuesdayVisitor, setIsGivingTuesdayVisitor] = useState(false)
  const [is12DaysVisitor, setIs12DaysVisitor] = useState(false)
  const [isNewtownVisitor, setIsNewtownVisitor] = useState(false)
  const [isKoreanK9Visitor, setIsKoreanK9Visitor] = useState(false)
  const [isCatTownVisitor, setIsCatTownVisitor] = useState(false)
  const [isForgottenAnimalsVisitor, setIsForgottenAnimalsVisitor] = useState(false)
  const [isMuttvilleVisitor, setIsMuttvilleVisitor] = useState(false) 
  const [isGlobalElephantSanctuaryVisitor, setIsGlobalElephantSanctuaryVisitor] = useState(false)
  const [isDogsForBetterLivesVisitor, setIsDogsForBetterLivesVisitor] = useState(false)
  const [isTheRealBarkVisitor, setIsTheRealBarkVisitor] = useState(false)
  const [isMauiHumaneSocietyVisitor, setIsMauiHumaneSocietyVisitor] = useState(false)
  const [isSavasSafeHavenVisitor, setIsSavasSafeHavenVisitor] = useState(false)
  const [isSlothFoundationVisitor, setIsSlothFoundationVisitor] = useState(false)
  const [isNorthShoreAnimalLeagueVisitor, setIsNorthShoreAnimalLeagueVisitor] = useState(false)
  const [isBridgeTester, setIsBridgeTester] = useState(false)
  const [isShibaLpProvider, setIsShibaLpProvider] = useState(false)
  const [isUniLpProvider, setIsUniLpProvider] = useState(false)
  const [isPerrysPlaceVisitor, setIsPerrysPlaceVisitor] = useState(false)
  const [isSafemoonSwapVisitor, setIsSafemoonSwapVisitor] = useState(false)
  const [isPuppyDayVisitor, setIsPuppyDayVisitor] = useState(false)
  const [isLovablePawsVisitor, setIsLovablePawsVisitor] = useState(false)

  const badgeEvents = [
    { name: '12 Days of Giving' , start: 1639458000, end: 1640451599, setState: setIs12DaysVisitor },
    { name: 'Newtown Visitor', start: 1639489730, end: 1639576800, setState: setIsNewtownVisitor },
    { name: 'Korean K9 Rescue Visitor', start: 1639576800, end: 1639663200, setState: setIsKoreanK9Visitor },
    { name: 'Cat Town Visitor', start: 1639674000, end: 1639749600, setState: setIsCatTownVisitor },
    { name: 'Forgotten Animals Visitor', start: 1639749600, end: 1639836000, setState: setIsForgottenAnimalsVisitor },
    { name: 'Muttville Visitor', start: 1639836000, end: 1639924200, setState: setIsMuttvilleVisitor },
    { name: 'Global Elephant Sanctuary Visitor', start: 1639834778, end: 1640010600, setState: setIsGlobalElephantSanctuaryVisitor },
    { name: 'Dogs for Better Lives', start: 1640010600, end: 1640097000, setState: setIsDogsForBetterLivesVisitor },
    { name: 'The Real Bark', start: 1640095200, end: 1640181600, setState: setIsTheRealBarkVisitor },
    { name: 'Maui Humane Society', start: 1640183400, end: 1640269800, setState: setIsMauiHumaneSocietyVisitor },
    { name: 'Savas Safe Haven', start: 1640269800, end: 1640356200, setState: setIsSavasSafeHavenVisitor },
    { name: 'Sloth Conservation Foundation', start: 1640356200, end: 1640442600, setState: setIsSlothFoundationVisitor },
    { name: 'North Shore Animal League', start: 1640442600, end: 1640529000, setState: setIsNorthShoreAnimalLeagueVisitor },
    { name: 'Perrys Place', start: 1642377600, end: 1642500000, setState: setIsPerrysPlaceVisitor },
    { name: 'Safemoonswap Launch', start: 1647489600, end: 1647576000, setState: setIsSafemoonSwapVisitor },
    { name: 'Puppy Day Visitor', start: 1648004400, end: 1648177200, setState: setIsPuppyDayVisitor },
    { name: 'Lovable Paws Visitor', start: 1652846400, end: 1652932800, setState: setIsLovablePawsVisitor },
  ]

  useEffect(() => {
    async function getVisits() {
      const web3Provider = Moralis.web3Library;
      const checkSummedAddress = web3Provider.utils.getAddress(account)
      const db = getFirestore()
      const docRef = doc(db, 'pawthereum', 'wallets', `${checkSummedAddress}`, 'visits')
      const docSnap = await getDoc(docRef)
      let dates = []
      if (docSnap.exists()) {
        dates = docSnap.data().dates || []
        dates.push(Timestamp.fromDate(new Date()))
      }
      setVisits(dates)
    }
    async function getTokenBalance() {
      const pawthAddress = PAWTH_ADDRESS[chainId]
      const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
      const pawthBalanceRaw = pawth ? pawth.balance : '0'
      const pawthBalance = pawth ? Moralis.Units.FromWei(pawthBalanceRaw, DECIMALS) : 0
      if (pawthBalance > 0) {
        setIsHolder(true)
      }
      if (pawthBalance > 10000) {
        setIsInWildCatClub(true)
      }
      const shibLpToken = assets ? assets.find(a => a.token_address === SHIBA_LP_ADDRESS) : undefined
      const shibLpBalanceRaw = shibLpToken ? shibLpToken.balance : '0'
      const shibLpBalance = shibLpToken ? Moralis.Units.FromWei(shibLpBalanceRaw, 18) : 0
      if (shibLpBalance > 0) {
        setIsShibaLpProvider(true)
      }
      const uniLpToken = assets ? assets.find(a => a.token_address === UNI_LP_ADDRESS) : undefined
      const uniLpTokenRaw = uniLpToken ? uniLpToken.balance : '0'
      const uniLpTokenBalance = uniLpToken ? Moralis.Units.FromWei(uniLpTokenRaw, 18) : 0
      if (uniLpTokenBalance > 0) {
        setIsUniLpProvider(true)
      }
    }
    async function analyzeNativeTransactions() {
      const web3Provider = Moralis.web3Library;
      const pawth = new web3Provider.Contract(
        JSON.parse(PAWTH_ABI[chainId]),
        PAWTH_ADDRESS[chainId]
      )
      const marketingWallet = await pawth.methods.marketingWallet()
      const toMarketingWallet = nativeTransactions.find(t => t.to_address === marketingWallet)
      if (toMarketingWallet) {
        setIsMarketingDonor(true)
      }
    }
    async function analyzeTokenTransactions() {
      const pawthAddress = PAWTH_ADDRESS[chainId]
      const pawth = assets ? assets.find(a => a.token_address === pawthAddress) : undefined
      const pawthBalanceRaw = pawth ? pawth.balance : '0'
      const pawthBalance = pawth ? Moralis.Units.FromWei(pawthBalanceRaw, DECIMALS) : 0

      const pawthTransfers = ERC20Transfers.filter(t => t.address === PAWTH_ADDRESS[chainId])
      const soldPawth = pawthTransfers.find(t => t.from_address === account)
      setIsDiamondHands(!soldPawth && pawthBalance > 0)

      const startBlockOfNov18Slurp = 13642443
      const endBlockOfNov18Slurp = 13643054
      const nov18Slurps = pawthTransfers.find(t => t.block_number >= startBlockOfNov18Slurp && t.block_number <= endBlockOfNov18Slurp && t.to_address === account)
      setIsNov18Slurper(nov18Slurps)

      const startBlackFurday2021 = 13686521
      const endBlackFurday2021 = 13695284
      const blackFurDayBuys = pawthTransfers.find(t => t.block_number >= startBlackFurday2021 && t.block_number <= endBlackFurday2021 && t.to_address === account)
      setIsBlackFurday2021Buyer(blackFurDayBuys)
    }
    async function checkIfVoter() {
      const hasVoted = await getVoterStatus(account, SNAPSHOT_URL)
      setIsVoter(hasVoted)
    }
    if (account) {
      getVisits()
      // analyzeNativeTransactions()
      checkIfVoter()

      if (ERC20Transfers) {
        analyzeTokenTransactions()
        getTokenBalance()
      }

      setIsRedCandleSurvivor(RED_CANDLE_SURVIVORS.includes(account))
      setIsOriginalSwapper(ORIGINAL_SWAPPERS.includes(account))
      setIsBugSquisher(BUG_SQUISHERS.includes(account))
      setIsBridgeTester(BRIDGE_TESTERS.includes(account))
      setIsCatDayVisitor(CAT_DAY_VISITORS.includes(account))
      setIsEdinburghEventVisitor(EDINBURGH_VISITORS.includes(account))
      setIsPawsOrgEventVisitor(PAWS_ORG_VISITORS.includes(account))
    }
  }, [account, assets, ERC20Transfers])

  useEffect(() => {
    async function checkBadgeVisits() {
      if (visits.length === 0) return
      let badges = []
      for (const visit of visits) {
        const date = visit.toDate().getTime() / 1000
        badges = badges.concat(badgeEvents.filter(e => {
          return date >= e.start && date <= e.end
        }))
      }
      for (const badge of badges) {
        badge.setState(true)
      }
    }
    checkBadgeVisits()
  }, [visits])

  const badges = [
    {
      title: 'Pawth Holder',
      description: 'Holds +1 Pawth',
      img: fist,
      userOwnsBadge: isHolder
    },
    {
      title: 'Original Swapper',
      description: 'Swapped Grumpy for Pawth',
      img: swap,
      userOwnsBadge: isOriginalSwapper
    },
    {
      title: 'Diamond Paws',
      description: 'Never sold Pawth',
      img: diamondPaws,
      userOwnsBadge: isDiamondHands
    },
    {
      title: 'Snapshot Voter',
      description: 'Voted on proposal',
      img: vote,
      userOwnsBadge: isVoter
    },
    {
      title: 'Wild Cats Club',
      description: 'Holds +10k Pawth',
      img: wildcat,
      userOwnsBadge: isInWildCatClub
    },
    {
      title: 'Bug Squisher',
      description: 'Reported a Pawth bug',
      img: bug,
      userOwnsBadge: isBugSquisher
    },
    {
      title: 'National Cat Day',
      description: "Visited on Cat Day '21",
      img: catDay,
      userOwnsBadge: isCatDayVisitor
    },
    {
      title: 'Shiba Liquidity Legend',
      description: 'Provided liquidity to Shiba Swap',
      img: shibaInuLp,
      userOwnsBadge: isShibaLpProvider
    },
    {
      title: 'Uni Liquidity Legend',
      description: 'Provided liquidity to Uniswap',
      img: uniLp,
      userOwnsBadge: isUniLpProvider 
    },
    {
      title: 'Marketing Donor',
      description: 'Donated to the marketing wallet',
      img: heartSparkle,
      userOwnsBadge: isMarketingDonor
    },
    {
      title: 'Edinburgh Dog & Cat Home',
      description: 'Visited on Donation Day: 15-Nov-2021',
      img: edinburgh,
      userOwnsBadge: isEdinburghEventVisitor
    },
    {
      title: 'Red Candle Survivor',
      description: 'Survived the 18-Nov-2021 candle',
      img: redCandle,
      userOwnsBadge: isRedCandleSurvivor
    },
    {
      title: 'November 18 Slurper',
      description: 'Slurped the 18-Nov-21 dip',
      img: slurp,
      userOwnsBadge: isNov18Slurper
    },
    {
      title: 'Paws.org',
      description: 'Visited on Donation Day: 22-Nov-2021',
      img: paws,
      userOwnsBadge: isPawsOrgEventVisitor
    },
    {
      title: 'Black Furday 2021 Buyer',
      description: 'Made a pruchase on 26-Nov-2021',
      img: cart,
      userOwnsBadge: isBlackFurday2021Buyer
    },
    {
      title: 'Giving Tuesday Visitor',
      description: 'Visited on 30-Nov-2021',
      img: givingTuesday,
      userOwnsBadge: isGivingTuesdayVisitor
    },
    {
      title: '12 Days of Giving Visitor',
      description: 'Visited during 12 Days of Giving',
      img: twelveDaysOfGiving,
      userOwnsBadge: is12DaysVisitor
    },
    {
      title: 'Catherine Hubbard Sanctuary',
      description: 'Visited on Donation Day: 14-Dec-2021',
      img: newtown,
      userOwnsBadge: isNewtownVisitor 
    },
    {
      title: 'Korean K9 Rescue',
      description: 'Visited on Donation Day: 15-Dec-2021',
      img: koreanK9Rescue,
      userOwnsBadge: isKoreanK9Visitor
    },
    {
      title: 'Cat Town',
      description: 'Visited on Donation Day: 16-Dec-2021',
      img: catTown,
      userOwnsBadge: isCatTownVisitor
    },
    {
      title: 'Forgotten Animals',
      description: 'Visited on Donation Day: 17-Dec-2021',
      img: forgottenAnimals,
      userOwnsBadge: isForgottenAnimalsVisitor
    },
    {
      title: 'Muttville',
      description: 'Visited on Donation Day: 18-Dec-2021',
      img: muttville,
      userOwnsBadge: isMuttvilleVisitor
    },
    {
      title: 'Global Sanctuary for Elephants',
      description: 'Visited on Donation Day: 19-Dec-2021',
      img: globalSanctuaryElephants,
      userOwnsBadge: isGlobalElephantSanctuaryVisitor
    },
    {
      title: 'Dogs For Better Lives',
      description: 'Visited on Donation Day: 20-Dec-2021',
      img: dogsForBetterLvies,
      userOwnsBadge: isDogsForBetterLivesVisitor
    },
    {
      title: 'The Real Bark',
      description: 'Visited on Donation Day: 21-Dec-2021',
      img: theRealBark,
      userOwnsBadge: isTheRealBarkVisitor
    },
    {
      title: 'Maui Humane Society',
      description: 'Visited on Donation Day: 22-Dec-2021',
      img: mauiHumaneSociety,
      userOwnsBadge: isMauiHumaneSocietyVisitor
    },
    {
      title: "Sava's Safe Haven",
      description: 'Visited on Donation Day: 23-Dec-2021',
      img: savasSafeHaven,
      userOwnsBadge: isSavasSafeHavenVisitor
    },
    {
      title: 'The Sloth Conservation Foundation',
      description: 'Visited on Donation Day: 24-Dec-2021',
      img: slothConservationFoundation,
      userOwnsBadge: isSlothFoundationVisitor
    },
    {
      title: 'North Shore Animal League America',
      description: 'Visited on Donation Day: 25-Dec-2021',
      img: northShoreAnimalLeague,
      userOwnsBadge: isNorthShoreAnimalLeagueVisitor
    },
    {
      title: 'Bridge Tester',
      description: 'Helped Test Pawth Bridges',
      img: bridge,
      userOwnsBadge: isBridgeTester
    },
    {
      title: "Perry's Place",
      description: 'Visited on Donation Day: 17-Jan-2022',
      img: perrysPlace,
      userOwnsBadge: isPerrysPlaceVisitor
    },
    {
      title: "Safemoon Swap",
      description: 'Visited on Launch Day: 17-Mar-2022',
      img: safemoonswap,
      userOwnsBadge: isSafemoonSwapVisitor
    },
    {
      title: "National Puppy Day",
      description: 'Visited on Puppy Day: 23-Mar-2022',
      img: dog,
      userOwnsBadge: isPuppyDayVisitor
    },
    {
      title: "Lovable Paws",
      description: 'Visited on Donation Day: 18-May-2022',
      img: lovablePaws,
      userOwnsBadge: isLovablePawsVisitor
    },
  ]

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3>Your Badges</h3>
      </div>
      <Row gutter={16} style={{...styles.badgeCard, display: 'flex', justifyContent: 'center' }}>
        { badges ? badges.filter(b => b.userOwnsBadge).map((b, i) =>
          <Col key={i} span={ isMobile ? 24 : 12} style={{ marginBottom: '15px' }}>
            <Row style={{ justifyContent: 'center', paddingBottom: '5px' }}>
              <Col>
                <img src={b.img} style={{ width: '50px', height: '50px' }}></img>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Col>
                <strong>{b.title}</strong>
              </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Col>
                <small>{b.description}</small>
              </Col>
            </Row>
          </Col>
        ) : ''}
      </Row>
    </div>
  );
}

export default Badges