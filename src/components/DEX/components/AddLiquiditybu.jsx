import { useState, useEffect, useMemo } from "react";
import { useNativeBalance, useERC20Balances, useMoralis } from "react-moralis";
import InchModal from "./InchModal";
import ShelterModal from './ShelterModal';
import useInchDex from "../../../hooks/useInchDex";
import usePawSwap from '../../../hooks/usePawSwap';
import { Button, Card, Image, Input, InputNumber, Modal, Skeleton, Statistic, Row, Col } from "antd";
import Text from "antd/lib/typography/Text";
import { useTokenPrice } from "react-moralis";
import { tokenValue } from "../../../helpers/formatters";
import { getWrappedNative } from "../../../helpers/networks";
import { PAWTH_ADDRESS } from '../../../constants'
import useBreakpoint from "../../../hooks/useBreakpoint";
// import { useOneInchQuote } from "react-moralis";

const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const chainIds = {
  "0x1": "eth",
  "0x38": "bsc",
  "0x89": "polygon",
  "0x61": "bsctest"
};

const getChainIdByName = (chainName) => {
  for (let chainId in chainIds) {
    if (chainIds[chainId] === chainName) return chainId;
  }
};

const IsNative = (address) => address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const IsNativeTest = (address) => address === '0xae13d989dac2f0debff460ac112a837c89baa7cd';

function AddLiquidity({ chain, customTokens = {} }) {
  const { isMobile } = useBreakpoint()
  const { data: assets } = useERC20Balances();
  const { data: nativeBalance } = useNativeBalance({ chain })

  const styles = {
    card: {
      width: isMobile ? "400px" : "430px",
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "2rem",
      fontSize: "16px",
      fontWeight: "500",
    },
    input: {
      padding: "0",
      fontWeight: "500",
      fontSize: "23px",
      display: "block",
      width: "100%",
    },
    priceSwap: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "15px",
      color: "#434343",
      marginTop: "8px",
      padding: "0 10px",
    },
  };
  

  const { trySwap, tokenList, getQuote } = useInchDex(chain);
  const { tryPawSwap, getTaxStructure, hasAllowance, updateAllowance, getLiqQuote, tryAddLiquidity } = usePawSwap(chain);

  const { Moralis, isInitialized, chainId } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [isShelterModalActive, setShelterModalActive] = useState(false);
  const [shelter, setShelter] = useState(null);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState();
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});
  const [customTaxName, setCustomTaxName] = useState(null);
  const [customTaxAmount, setCustomTaxAmount] = useState(null);
  const [hasSufficientBalance, setHasSufficientBalance] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(null)
  const [allowanceButton, setAllowanceButton] = useState({
    display: false,
    isLoading: false,
    isActive: false,
    text: 'Approve'
  })

  async function attemptAddLiquidity () {
    console.log('quote', quote)
    
    setButtonStatus({
      isActive: false,
      isLoading: true,
      text: 'Adding'
    })
    switch (chain) {
      case 'eth':
      case '0x1':
      case 'rinkeby':
      case '0x4':
      case 'bsc':
      case '0x38':
        await tryAddLiquidity(quote)
        setButtonStatus(null)
        break;
      case 'bsctest':
      case '0x61':
        await tryAddLiquidity(quote)
        setButtonStatus(null)
        break;
      default:
        await tryAddLiquidity(quote)
        setButtonStatus(null)
    }
  }

  async function attemptAllowance () {
    let token, amount
    if (IsNative(quote.fromToken.address) || IsNativeTest(quote.fromToken.address)) {
      token = quote.toToken
      amount = quote.toTokenAmount
    } else {
      token = quote.fromToken
      amount = quote.fromAmount
    }
    setAllowanceButton({
      display: true,
      isActive: false,
      isLoading: true,
      text: `Approving ${token.symbol}`
    })
    await updateAllowance(amount, token, 'router')
    return setAllowanceButton({
      display: false,
      isActive: false,
      isLoading: false,
      text: 'Approve'
    })
  }

  // add pawth if it isnt already listed
  if (tokenList) {
    if (!tokenList[PAWTH_ADDRESS[chain]]) {
      console.log('not in token list', PAWTH_ADDRESS[chain])
      tokenList[PAWTH_ADDRESS[chain]] = {
        address: PAWTH_ADDRESS[chain],
        symbol: 'PAWTH',
        decimals: 9,
        logoURI: 'https://pawthereum.com/shared-files/2015/?logo-notext-trsp-1.png',
        name: 'Pawthereum'
      }
    }
    if (!toToken) {
      setToToken(tokenList[PAWTH_ADDRESS[chain]])
    }
  }

  const tokens = useMemo(() => {
    return { ...customTokens, ...tokenList };
  }, [customTokens, tokenList]);

  const fromTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[fromToken?.["address"]] ? tokenPricesUSD[fromToken?.["address"]] : null),
    [tokenPricesUSD, fromToken]
  );

  const toTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[toToken?.["address"]] ? tokenPricesUSD[toToken?.["address"]] : null),
    [tokenPricesUSD, toToken]
  );

  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(4)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    if (!toTokenPriceUsd || !quote) return null;
    return `~$ ${(Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) * toTokenPriceUsd).toFixed(4)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toTokenPriceUsd, quote]);

  useEffect(() => {
    console.log('im checking this quote', quote)

    if (!quote || !quote.fromAmount || !quote.fromToken || !quote.toTokenAmount || !quote.toToken) {
      return setAllowanceButton({
        display: false,
        isLoading: false,
        isActive: false,
        text: `Approve`
      })
    }

    checkHasSufficientBalanceForAllTokens()

    const requiresAllowance = (token) => {
      if (IsNative(token.address)) return false
      if (chain === 'bsctest') {
        if (IsNativeTest(token.address)) return false
        return true
      }
      return true
    }

    if (requiresAllowance(quote.fromToken)) {
      console.log('I need to check allowance for ', quote.fromToken)
      checkHasSufficientAllowance(quote.fromAmount, quote.fromToken)
    }

    if (requiresAllowance(quote.toToken)) {
      console.log('I need to check allowance for ', quote.toToken)
      checkHasSufficientAllowance(quote.toAmount, quote.toToken)
    }

    async function checkHasSufficientBalanceForAllTokens() {
      const sufficentBalanceCheck = await Promise.all([
        checkHasSufficientBalance(quote.fromAmount, quote.fromToken),
        checkHasSufficientBalance(quote.toTokenAmount, quote.toToken)
      ])
      console.log('checks', sufficentBalanceCheck)
      setHasSufficientBalance(sufficentBalanceCheck.every(c => c === true))
    }

    async function checkHasSufficientBalance(amount, token) {
      if (IsNative(token.address)) {
        if (!nativeBalance.balance) return setHasSufficientBalance(false)
        return amount <= parseFloat(Moralis.Units.FromWei(nativeBalance.balance))
      }
      const asset = assets ? assets.find(a => a.token_address.toLowerCase() === token.address.toLowerCase()) : undefined
      console.log('asset', asset)
      if (!asset) return setHasSufficientBalance(true)
      console.log('amount', amount)
      console.log('check', parseFloat(Moralis.Units.FromWei(asset.balance, asset.decimals)))
      return amount <= Moralis.Units.FromWei(asset.balance, asset.decimals)
    }

    async function checkHasSufficientAllowance(amount, token) {
      const hasSufficientAllowance = await hasAllowance(amount, token, 'router')
      if (!hasSufficientAllowance) {
        setAllowanceButton({
          display: requiresAllowance(token),
          isLoading: false,
          isActive: true,
          text: `Approve ${token.symbol}`
        })
      }
    }

  }, [quote])

  // tokenPrices
  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(fromToken["address"]) ? getWrappedNative(validatedChain) : fromToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken["address"]]: price["usdPrice"],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken["address"]) ? getWrappedNative(validatedChain) : toToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [toToken["address"]]: price["usdPrice"],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokens || fromToken) return null;
    setFromToken(tokens[nativeAddress]);
  }, [tokens, fromToken]);

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain) return { isActive: false, text: `Switch to ${chain}` };
    if (buttonStatus) return buttonStatus

    if (!fromAmount) return { isActive: false, text: "Enter an amount" };
    if (chain !== 'bsctest') {
      if (!nativeBalance.balance) return { isActive: false, text: 'Loading balances...' }
      if (!hasSufficientBalance) return { isActive: false, text: "Insufficient balance" };
    }
    if (fromAmount && currentTrade) return { isActive: true, text: "Add Liquidity" };
    return { isActive: false, text: "Select tokens" };
  }, [fromAmount, currentTrade, chainId, chain, buttonStatus]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount) setCurrentTrade({ 
      fromToken, 
      toToken, 
      fromAmount, 
      chain,
      customTaxAmount,
      shelter
    });
    console.log('current trade', currentTrade)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toToken, fromToken, fromAmount, chain, shelter, customTaxAmount]);

  useEffect(() => {
    console.log('current trade is updated...', currentTrade)
    if (currentTrade) getLiqQuote(currentTrade).then((quote) => setQuote(quote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.["address"]]) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    console.log(Quote);
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken["decimals"]) / tokenValue(toTokenAmount, toToken["decimals"])
    ).toFixed(6);
    return (
      <Text style={styles.priceSwap}>
        Price:{" "}
        <Text>{`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[[toToken["address"]]].toFixed(6)})`}</Text>
      </Text>
    );
  };

  return (
    <>
      <Card style={styles.card} bodyStyle={{ padding: "18px" }}>
        <Card style={{ borderRadius: "2rem" }} bodyStyle={{ padding: "0.8rem" }}>
          <div style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>From</div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <div>
              <InputNumber
                bordered={false}
                placeholder="0.00"
                style={{ ...styles.input, marginLeft: "-10px" }}
                onChange={setFromAmount}
                value={fromAmount}
              />
              <Text style={{ fontWeight: "600", color: "#434343" }}>{fromTokenAmountUsd}</Text>
            </div>
            <Button
              style={{
                height: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0.6rem",
                padding: "5px 10px",
                fontWeight: "500",
                fontSize: "17px",
                gap: "7px",
                border: "none",
              }}
              onClick={() => setFromModalActive(true)}
            >
              {fromToken ? (
                <Image
                  src={fromToken?.logoURI || "https://etherscan.io/images/main/empty-token.png"}
                  alt="nologo"
                  width="30px"
                  preview={false}
                  style={{ borderRadius: "15px" }}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{fromToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        <Card style={{ borderRadius: "2rem", marginTop: "10px" }} bodyStyle={{ padding: "0.8rem" }}>
          <div style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>To</div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <div>
              <Input
                bordered={false}
                placeholder="0.00"
                style={styles.input}
                readOnly
                value={quote ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6) : ""}
              />
              <Text style={{ fontWeight: "600", color: "#434343" }}>{toTokenAmountUsd}</Text>
            </div>
            <Button
              style={{
                height: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0.6rem",
                padding: "5px 10px",
                fontWeight: "500",
                fontSize: "17px",
                gap: "7px",
                border: "none",
              }}
              onClick={() => setToModalActive(true)}
              type={toToken ? "default" : "primary"}
            >
              {toToken ? (
                <Image
                  src={toToken?.logoURI || "https://etherscan.io/images/main/empty-token.png"}
                  alt="nologo"
                  width="30px"
                  preview={false}
                  style={{ borderRadius: "15px" }}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{toToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        {quote && (
          <div>
            <Text
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                color: "#434343",
                marginTop: "8px",
                padding: "0 10px",
              }}
            >
              Estimated Gas: <Text>{quote?.estimatedGas}</Text>
            </Text>
            <PriceSwap />
          </div>
        )}
        <Row gutter={6}>
          {
            !allowanceButton.display ? '' :
            <Col span={12}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  marginTop: "15px",
                  borderRadius: "0.6rem",
                  height: "50px",
                }}
                onClick={() => attemptAllowance(quote)}
                disabled={!allowanceButton.isActive}
                loading={allowanceButton.isLoading}
              >
                {allowanceButton.text}
              </Button>
            </Col>
          }
          <Col span={allowanceButton.display ? 12 : 24}> 
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "0.6rem",
                height: "50px",
              }}
              onClick={() => attemptAddLiquidity(quote)}
              disabled={!ButtonState.isActive || allowanceButton.display && (allowanceButton.isActive || allowanceButton.isLoading)}
              loading={ButtonState.isLoading}
            >
              {ButtonState.text}
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Select a token"
        visible={isFromModalActive}
        onCancel={() => setFromModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal
          open={isFromModalActive}
          onClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokens}
          chain={chain}
        />
      </Modal>
      <Modal
        title="Select a token"
        visible={isToModalActive}
        onCancel={() => setToModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal 
          open={isToModalActive} 
          onClose={() => setToModalActive(false)} 
          setToken={setToToken} 
          tokenList={tokens} 
          chain={chain}
        />
      </Modal>
      <Modal
        title="Select a shelter"
        visible={isShelterModalActive}
        onCancel={() => setShelterModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <ShelterModal 
          open={isShelterModalActive} 
          onClose={() => setShelterModalActive(false)} 
          setShelter={setShelter} 
          chain={chain}
        />
      </Modal>
    </>
  );
}

export default AddLiquidity;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
