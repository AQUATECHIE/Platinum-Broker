import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import DerivAPI from '@deriv/deriv-api'
import '../Style/Chart.css'

const Chart = () => {
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const candleSeries = useRef(null);

  useEffect(() => {
    // Initialize Lightweight Chart
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    candleSeries.current = chart.current.addCandlestickSeries();

    // Initialize Deriv API
    const api = new DerivAPI({
      app_id: "your-app-id", // Replace with your actual app ID
      endpoint: "wss://ws.binaryws.com/websockets/v3?app_id=your-app-id",
    });

    // Fetch Data
    const getMarketData = async () => {
      const ticks = await api.subscribe({
        ticks: "R_100",
        subscribe: 1,
      });

      ticks.on("message", (msg) => {
        const { tick } = msg;
        candleSeries.current.update({
          time: tick.epoch,
          open: tick.quote,
          high: tick.quote,
          low: tick.quote,
          close: tick.quote,
        });
      });
    };

    getMarketData();

    return () => {
      if (chart.current) chart.current.remove();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default Chart;
