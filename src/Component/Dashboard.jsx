import Chart from "../Component/Chart.jsx";
// import Controls from "../Component/Controls.jsx";
import BuySellButton from "./BuySellButton.jsx";
import TradeHistory from "./History.jsx";
import '../Style/Dashboard.css'


const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <Chart  />
      <BuySellButton  />
      <TradeHistory />
    </div>
  );
};

export default Dashboard;
