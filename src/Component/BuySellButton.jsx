// /src/components/TradeButtons.js
import React from 'react';
import WebSocketService from "../services/Api.js"

const BuySellButton = () => {

    const handleBuy = () => {
      console.log('Buy action triggered');
      
      // Send buy command via WebSocket
      WebSocketService.send({
        action: 'buy',
        symbol: 'R_100',
        amount: 10,
        // Add any additional parameters required by your backend
      });
    };
  
    const handleSell = () => {
      console.log('Sell action triggered');
      
      // Send sell command via WebSocket
      WebSocketService.send({
        action: 'sell',
        symbol: 'R_100',
        amount: 10,
        // Add any additional parameters required by your backend
      });
    };
  
    return (
      <div>
        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleSell}>Sell</button>
      </div>
    );
  };
  
  export default BuySellButton;