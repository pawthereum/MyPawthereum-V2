import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Input } from 'antd';
import { PAWTH_ADDRESS } from '../../../constants'
import { SHELTER_LIST } from '../../../constants/shelterList'
import { PAWTH_ABI } from '../../../constants/abis/pawth'

function ShelterModal({ open, onClose, setShelter, chain }) {
  const { Moralis } = useMoralis();
  const [fetchingPawthListItem, setFetchingPawthListItem] = useState(false)
  const [pawthListItem, setPawthListItem] = useState(null)
  const [query, setQuery] = useState(null)
  const [shelterList, setShelterList] = useState(SHELTER_LIST) 
  const [filteredShelterList, setFilteredShelterList] = useState(
    Object.keys(SHELTER_LIST).map(shelter => shelter)
  )

  useEffect(() => {
    addPawthToList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    filterShelters()
    async function filterShelters () {
      if (!pawthListItem && !fetchingPawthListItem) {
        await addPawthToList()
      }
      const defaultList = Object.keys(shelterList).map(shelter => shelter)
  
      if (!query || query === '' || !query.length) return setFilteredShelterList(defaultList)
  
      const filteredShelters = defaultList.filter(token => {
        return shelterList[token].name.toLowerCase().includes(query.toLowerCase())
      })
  
      if (pawthListItem) {
        filteredShelterList.unshift(pawthListItem.address)
      }
  
      setFilteredShelterList(filteredShelters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  async function addPawthToList () {
    setFetchingPawthListItem(true)
    const web3Provider = await Moralis.enableWeb3();
    const pawth = new web3Provider.eth.Contract(
      JSON.parse(PAWTH_ABI[chain]),
      PAWTH_ADDRESS[chain]
    )

    const charityWallet = await pawth.methods.charityWallet().call()
    const pawthItem = {
      address: charityWallet,
      logoURI: 'https://pawthereum.com/shared-files/2015/?logo-notext-trsp-1.png',
      name: 'Pawthereum Charity Wallet',
      symbol: 'PAWTH',
      loading: false
    }
    const list = shelterList
    list[charityWallet] = pawthItem

    setShelterList(list)
    setPawthListItem(pawthItem)
    setFetchingPawthListItem(false)
  }

  if (!open) return null;

  return (
    <div style={{ overflow: "auto", height: "500px" }}>
      <div style={{ padding: '10px' }}>
        <Input 
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {!filteredShelterList
        ? null
        : filteredShelterList.reverse().map((token, index) => (
            <div
              style={{
                padding: "5px 20px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setShelter(shelterList[token]);
                onClose();
              }}
              key={index}
            >
              <img
                style={{
                  height: "32px",
                  width: "32px",
                  marginRight: "20px",
                }}
                src={shelterList[token].logoURI}
                alt="noLogo"
              />
              <div>
                <h4>{shelterList[token].name}</h4>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    lineHeight: "14px",
                  }}
                >
                  {shelterList[token].symbol}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ShelterModal;
