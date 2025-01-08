// /src/pages/TradeHistory.js
import React, { useEffect, useState } from 'react';
import WebSocketService from "../services/Api.js"

const TradeHistory = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    WebSocketService.connect();
    WebSocketService.send({
      ticks_history: "R_100",
      adjust_start_time: 1,
      count: 100,
      end: "latest",
      subscribe: 1,
    });

    WebSocketService.on('history', (data) => {
      setTrades(data.history);
    });

    return () => {
      WebSocketService.close();
    };
  }, []);

  return (
    <div>
      <h2>Trade History</h2>
      <ul>
        {trades.map((trade, index) => (
          <li key={index}>
            {trade.time}: {trade.amount} {trade.action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeHistory;
