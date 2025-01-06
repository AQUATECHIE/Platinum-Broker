import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

function Chart() {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
    });

    const candleSeries = chart.addCandlestickSeries();
    chartRef.current = chart;

    const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=67003');

    ws.onopen = () => {
      const request = {
        ticks_history: 'R_100',
        adjust_start_time: 1,
        count: 100,
        end: 'latest',
        start: 1,
        style: 'candles',
        subscribe: 1
      };
      ws.send(JSON.stringify(request));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.candles) {
        const candles = response.candles.map(candle => ({
          time: candle.epoch,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        }));
        candleSeries.setData(candles);
      } else if (response.tick) {
        candleSeries.update({
          time: response.tick.epoch,
          open: response.tick.quote,
          high: response.tick.quote,
          low: response.tick.quote,
          close: response.tick.quote,
        });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div ref={chartContainerRef} />
  );
}

export default Chart;
