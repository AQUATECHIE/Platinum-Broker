// /src/components/TradingControls.js
import React, { useState, useEffect } from 'react';
import { createWebSocket, sendProposalRequest, sendBuyRequest, sendSellRequest } from '../services/Api.js';

const TradingControls = () => {
  const [ws, setWs] = useState(null);
  const [proposalId, setProposalId] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [buyResponse, setBuyResponse] = useState(null); // New state to hold buy response

  useEffect(() => {
    const webSocket = createWebSocket();
    setWs(webSocket);

    webSocket.onmessage = (event) => {

      const data = JSON.parse(event.data);
      console.log("Received data:", data);

      if (data.msg_type === "proposal") {
        if (data.error) {
          console.warn("Error in proposal response:", data.error);
          // Handle error (e.g., display an error message to the user)
        } else if (data.proposal && data.proposal.id) {
          console.log("Proposal ID:", data.proposal.id);
          // Proceed with buy logic using proposal.id
        } else {
          console.warn("Received proposal without a valid ID:", data);
        }
      } else if (data.ohlc && data.ohlc.id) {
        console.log("OHLC ID:", data.ohlc.id);
        // Use ohlc.id for your logic
      } else if (data.subscription && data.subscription.id) {
        console.log("Subscription ID:", data.subscription.id);
        // Use subscription.id if relevant
      } else {
        console.warn("Received data without a valid ID:", data);
      }


      if (data.msg_type === 'buy') {
        setBuyResponse(data.buy); // Store the buy response
        setContractId(data.buy.contract_id);
      }
    };
    
    

    return () => {
      webSocket.close();
    };
  }, []);

  const handleBuyClick = () => {
    const contractParams = {
      proposal: 1,
      amount: 10,
      basis: "stake",
      contract_type: "CALL",
      currency: "USD",
      duration: 5,
      duration_unit: "t",
      symbol: "frxEURUSD"
    };
    sendProposalRequest(ws, contractParams);
  };

  const handleConfirmBuyClick = () => {
    if (proposalId) {
      sendBuyRequest(ws, proposalId);
    } else {
      alert("Proposal ID not available. Please request a proposal first.");
    }
  };

  const handleSellClick = () => {
    if (contractId) {
      sendSellRequest(ws, contractId);
    } else {
      alert("Contract ID not available.");
    }
  };

  return (
    <div>
      <button onClick={handleBuyClick}>Request Buy Proposal</button>
      <button onClick={handleConfirmBuyClick}>Confirm Buy</button>
      <button onClick={handleSellClick}>Sell</button>

      {buyResponse && (
        <div>
          <h3>Buy Response</h3>
          <p>Contract ID: {buyResponse.contract_id}</p>
          <p>Details: {JSON.stringify(buyResponse)}</p>
        </div>
      )}
    </div>
  );
};


export default TradingControls;
