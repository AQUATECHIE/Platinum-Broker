import React, { useEffect, useRef } from "react";

const BuySellButtons = ({ chartRef, symbol, setTrades }) => {
  const wsRef = useRef(null);
  const API_TOKEN = "S0AwMN03iKvFJeE"; // Replace with your actual API token

  useEffect(() => {
    wsRef.current = new WebSocket("wss://ws.deriv.com/websockets/v3?app_id=67003");

    wsRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
      // Authenticate with API token
      wsRef.current.send(JSON.stringify({ authorize: API_TOKEN }));
    };

    wsRef.current.onerror = (error) => console.error("❌ WebSocket Error:", error);
    wsRef.current.onclose = () => console.log("⚠️ WebSocket closed");

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const placeTrade = (action) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("🚨 WebSocket is not connected.");
      return;
    }

    // Step 1: Send a proposal request
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

    // Step 2: Listen for proposal response
    const handleProposalResponse = (event) => {
      const response = JSON.parse(event.data);

      if (response.error) {
        console.error("❌ Proposal Error:", response.error.message);
        ws.removeEventListener("message", handleProposalResponse);
        return;
      }

      if (response.proposal && response.proposal.id) {
        // Step 3: If proposal is valid, send buy request
        const buyRequest = {
          buy: response.proposal.id,
          price: 10,
        };

        ws.send(JSON.stringify(buyRequest));

        // Step 4: Listen for buy response
        const handleBuyResponse = (event) => {
          const buyResponse = JSON.parse(event.data);
          if (buyResponse.error) {
            console.error("❌ Buy Error:", buyResponse.error.message);
            ws.removeEventListener("message", handleBuyResponse);
            return;
          }

          if (buyResponse.buy && buyResponse.buy.transaction_id) {
            setMarker(action, buyResponse.buy.transaction_id);
          }
          ws.removeEventListener("message", handleBuyResponse);
        };

        ws.addEventListener("message", handleBuyResponse);
        ws.removeEventListener("message", handleProposalResponse);
      }
    };

    ws.addEventListener("message", handleProposalResponse);
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
