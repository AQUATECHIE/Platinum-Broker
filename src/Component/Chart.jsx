import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import '../Style/Chart.css'

// Register Chart.js modules
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const Chart = () => {
  // Example data and configuration for the chart
  const data = {
    labels: ["20:30", "21:00", "21:30", "22:00", "22:30", "23:00"],
    datasets: [
      {
        label: "Stock Price",
        data: [227.5, 227.8, 227.6, 227.7, 227.9, 228.0], // Example data points
        borderColor: "#6b73ff",
        backgroundColor: "rgba(107, 115, 255, 0.2)",
        pointBackgroundColor: "#6b73ff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#3a3a4e",
        },
        ticks: {
          color: "#aaa",
        },
      },
      y: {
        grid: {
          color: "#3a3a4e",
        },
        ticks: {
          color: "#aaa",
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "#1e1e2e",
        titleColor: "#fff",
        bodyColor: "#aaa",
        borderColor: "#6b73ff",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-title">Binário - Apple (OTC) 84%</div>
      </div>
      <div className="chart" style={{ height: "400px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
