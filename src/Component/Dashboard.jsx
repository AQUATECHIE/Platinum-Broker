import React, { useState } from "react";
import Chart from "../Component/Chart.jsx";
import Controls from "../Component/Controls.jsx";
import '../Style/Dashboard.css'
import { fromJSON } from "postcss";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  const updateChart = (action, value) => {
    setChartData((prevData) => [...prevData, { action, value }]);
  };

  return (
    <div className="dashboard-container">
      <Chart chartData={chartData} />
      <Controls updateChart={updateChart} />
    </div>
  );
};

export default Dashboard;
