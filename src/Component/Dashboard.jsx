import React from "react";
import Sidebar from '../Component/Sidebar.jsx'
import Chart from '../Component/Chart.jsx'
import Controls from '../Component/Controls.jsx'
import '../Style/Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Chart />
        <Controls />
      </div>
    </div>
  );
}

export default Dashboard;
