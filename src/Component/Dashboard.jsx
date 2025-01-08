import Chart from "../Component/Chart.jsx";
// import Controls from "../Component/Controls.jsx";
import TradingComponent from "./BuySellButton.jsx";
import TradeHistory from "./History.jsx";
import '../Style/Dashboard.css'


const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <Chart  />
      <TradingComponent  />
      <TradeHistory />
    </div>
  );
};

export default Dashboard;
