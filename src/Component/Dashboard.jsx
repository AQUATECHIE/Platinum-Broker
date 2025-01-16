import TradingChart from "./Chart.jsx";
// import Controls from "../Component/Controls.jsx";
import TradingControls from "./BuySellButton.jsx";
// import TradeHistory from "./History.jsx";
import '../Style/Dashboard.css'


const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <TradingChart />
      <TradingControls  />
      {/* <TradeHistory /> */}
    </div>
  );
};

export default Dashboard;
