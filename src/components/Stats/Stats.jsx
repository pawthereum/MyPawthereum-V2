import PawthStats from './components/PawthStats';
import Ranks from "./components/Ranks.jsx";
import PriceChart from './components/PriceChart';
import Reflections from "./components/Reflections";
import { Card } from "antd";

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
    paddingBottom: "10px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "640px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

function Stats() {
  return (
    <div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <PawthStats />
        </Card>
      </div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <PriceChart />
        </Card>
      </div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <Reflections />
        </Card>
      </div>
      <div style={styles.row}>
        <Card style={styles.card}>
          <Ranks />
        </Card>
      </div>
    </div>
  );
}

export default Stats;
