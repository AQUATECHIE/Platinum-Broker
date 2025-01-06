import Chart from "../Component/Chart.jsx";
import Controls from "../Component/Controls.jsx";
import '../Style/Dashboard.css'


const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <Chart  />
      <Controls  />
    </div>
  );
};

export default Dashboard;
