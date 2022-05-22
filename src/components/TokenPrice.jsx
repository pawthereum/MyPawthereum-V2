import { useState } from "react";
import { useTokenPrice } from "react-moralis";

const styles = {
  token: {
    height: "40px",
    width: "40px",
    gap: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
};
function TokenPrice(props) {
  const { data: formattedData } = useTokenPrice(props);

  const [isUSDMode, setIsUSDMode] = useState(true);

  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);

  const noLogoToken = "https://etherscan.io/images/main/empty-token.png";

  return (
    <div style={styles.token}>
      <img src={props.image || noLogoToken} alt="logo" style={{ width: props?.size || "40px", height: props?.size || "40px" }} />
      <span style={{ cursor: "pointer" }} onClick={toggleDisplayStyle} title={`Show in ${isUSDMode ? "ETH" : "USD"}`}>
        {formattedData && (isUSDMode ? '$' + formattedData.usdPrice.toFixed(4) : formattedData.formattedNative)}
      </span>
    </div>
  );
}
export default TokenPrice;
