import TradingChart from "./Chart.jsx";
// import Controls from "../Component/Controls.jsx";
import BuySellButtons from "./BuySellButton.jsx";
import ContractsFetcher from "./ContractsFetcher.jsx";
import '../Style/Dashboard.css'
import { useState } from "react";


const Dashboard = () => {
  const [contracts, setContracts] = useState([])
  const symbol = 'R_100'

  return (
    <div className="dashboard-container">
      <TradingChart />
      <ContractsFetcher symbol={symbol} onContractsFetched={setContracts} />
      {contracts.length > 0 && <BuySellButtons symbol={symbol} contracts={contracts} />}
      
    </div>
  );
};

export default Dashboard;
