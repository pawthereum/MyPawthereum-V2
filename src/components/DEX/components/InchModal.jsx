import React, { useState } from "react";
import { Input } from 'antd';
import { PAWTH_ADDRESS } from '../../../constants'
import { networkConfigs } from '../../../helpers/networks'

function InchModal({ open, onClose, setToken, tokenList, chain }) {
  const [filteredTokenList, setFilteredTokenList] = useState(
    Object.keys(tokenList).map(token => token)
  )
  // add pawth if it isnt already listed
  if (!tokenList[PAWTH_ADDRESS[chain]]) {
    tokenList[PAWTH_ADDRESS[chain]] = {
      address: PAWTH_ADDRESS[chain],
      symbol: 'PAWTH',
      decimals: 9,
      logoURI: 'https://pawthereum.com/shared-files/2015/?logo-notext-trsp-1.png',
      name: 'Pawthereum'
    }
  }

  if (!tokenList[networkConfigs[chain].wrapped]) {
    tokenList[networkConfigs[chain].wrapped] = {
      address: networkConfigs[chain].wrapped,
      symbol: networkConfigs[chain].currencySymbol,
      decimals: 18,
      logoURI: 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Binance-Coin-BNB-icon.png',
      name: networkConfigs[chain].currencyName
    }
  }

  function filterTokens (query) {
    const defaultList = Object.keys(tokenList).map(token => token)
    
    if (!query || query === '') return setFilteredTokenList(defaultList)
    
    const filteredTokens = defaultList.filter(token => {
      return tokenList[token].name.toLowerCase().includes(query.toLowerCase())
    })
    setFilteredTokenList(filteredTokens)
  }

  if (!open) return null;

  return (
    <div style={{ overflow: "auto", height: "500px" }}>
      <div style={{ padding: '10px' }}>
        <Input 
          placeholder="Search" 
          onChange={e => filterTokens(e.target.value)}
        />
      </div>
      {!tokenList
        ? null
        : filteredTokenList.map((token, index) => (
            <div
              style={{
                padding: "5px 20px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setToken(tokenList[token]);
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
                src={tokenList[token].logoURI}
                alt="noLogo"
              />
              <div>
                <h4>{tokenList[token].name}</h4>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    lineHeight: "14px",
                  }}
                >
                  {tokenList[token].symbol}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
}

export default InchModal;
