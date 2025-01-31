import React, { useState, useEffect } from "react";
import DerivAPI from "@deriv/deriv-api";

const BuySellButtons = ({ chartRef, symbol, setTrades }) => {
  const [api, setApi] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("wss://ws.deriv.com/websockets/v3?app_id=your_app_id");
    setWs(websocket);
    const apiInstance = new DerivAPI({ connection: websocket });
    setApi(apiInstance);

    websocket.onopen = () => console.log("WebSocket connected");
    websocket.onerror = (error) => console.error("WebSocket Error:", error);
    websocket.onclose = () => console.log("WebSocket closed");

    return () => websocket.close();
  }, []);

  const placeTrade = async (action) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.");
      return;
    }

    try {
      const proposalRequest = {
        proposal: 1,
        amount: 10,
        basis: "stake",
        contract_type: action === "buy" ? "CALL" : "PUT",
        currency: "USD",
        duration: 1,
        duration_unit: "m",
        symbol: symbol,
      };

      ws.send(JSON.stringify(proposalRequest));

      ws.onmessage = async (event) => {
        const response = JSON.parse(event.data);
        
        if (response.error) {
          console.error("Proposal Error:", response.error.message);
          return;
        }

        if (response.proposal && response.proposal.id) {
          const buyRequest = {
            buy: response.proposal.id,
            price: 10,
          };

          ws.send(JSON.stringify(buyRequest));

          ws.onmessage = (event) => {
            const buyResponse = JSON.parse(event.data);

            if (buyResponse.error) {
              console.error("Buy Error:", buyResponse.error.message);
              return;
            }

            setMarker(action, buyResponse.buy.transaction_id);
          };
        }
      };
    } catch (error) {
      console.error("Trade Error:", error);
    }
  };

  const setMarker = (action, transactionId) => {
    if (chartRef && chartRef.current) {
      const time = Math.floor(Date.now() / 1000);
      const trade = {
        time,
        type: action,
        amount: 10,
      };
      setTrades((prevTrades) => [...prevTrades, trade]);
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => placeTrade("buy")} className="bg-green-500">Buy</button>
      <button onClick={() => placeTrade("sell")} className="bg-red-500">Sell</button>
    </div>
  );
};

export default BuySellButtons;
