import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ trades }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  useEffect(() => {
    // Initialize the chart
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    candleSeriesRef.current = chartRef.current.addCandlestickSeries();

    // WebSocket connection
    const ws = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=67003"
    );

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      ws.send(
        JSON.stringify({
          ticks_history: "R_100",
          adjust_start_time: 1,
          count: 100,
          end: "latest",
          granularity: 60, // 1-minute candlestick
          style: "candles",
          subscribe: 1,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);

      if (data.msg_type === "ohlc") {
        const ohlc = data.ohlc;

        // Update chart with new data
        const candleData = {
          time: ohlc.epoch,
          open: parseFloat(ohlc.open),
          high: parseFloat(ohlc.high),
          low: parseFloat(ohlc.low),
          close: parseFloat(ohlc.close),
        };
        candleSeriesRef.current.update(candleData);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Resize chart on window resize
    const handleResize = () => {
      chartRef.current.resize(chartContainerRef.current.clientWidth, 300);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      ws.close();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  useEffect(() => {
    if (trades && candleSeriesRef.current) {
      trades.forEach((trade) => {
        candleSeriesRef.current.setMarkers([
          {
            time: trade.time,
            position: trade.type === "buy" ? "belowBar" : "aboveBar",
            color: trade.type === "buy" ? "green" : "red",
            shape: trade.type === "buy" ? "arrowUp" : "arrowDown",
            text: `${trade.type.toUpperCase()} ${trade.amount}`,
          },
        ]);
      });
    }
  }, [trades]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", width: "100%" }}
    />
  );
};

export default Chart;
