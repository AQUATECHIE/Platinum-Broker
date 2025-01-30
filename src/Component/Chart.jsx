import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { getCandles } from '../services/marketData';

const Chart = ({ symbol }) => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, { width: 600, height: 400 });
        const candleSeries = chart.addCandlestickSeries();

        getCandles(symbol).then(data => {
            candleSeries.setData(data.map(candle => ({
                time: candle.epoch,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
            })));
        });

        return () => chart.remove();
    }, [symbol]);

    return <div ref={chartContainerRef} />;
};

export default Chart;
