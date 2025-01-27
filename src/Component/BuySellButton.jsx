import React, { useState, useEffect } from "react";

const BuySellButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [proposalData, setProposalData] = useState(null);
  const [buyError, setBuyError] = useState("");
  const apiToken = "eakmu9hz3dvNcRO"; // Replace with a valid API token
  const ws = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=67003");

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
      // Authenticate with API token
      ws.current.send(JSON.stringify({ authorize: apiToken }));
    };

    ws.current.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.msg_type === "authorize") {
        if (response.error) {
          console.error("Authorization failed:", response.error.message);
          setIsLoggedIn(false);
        } else {
          console.log("Authorized successfully:", response.authorize);
          setIsLoggedIn(true);
        }
      }

      if (response.msg_type === "proposal") {
        if (response.error) {
          console.error("Error in proposal response:", response.error.message);
        } else {
          console.log("Proposal received:", response);
          setProposalData(response.proposal);
        }
      }

      if (response.msg_type === "buy") {
        if (response.error) {
          console.error("Error in buy response:", response.error.message);
          setBuyError(response.error.message);
        } else {
          console.log("Contract bought successfully:", response);
        }
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const requestProposal = () => {
    if (!isLoggedIn) {
      console.error("You must log in first.");
      return;
    }

    const proposalRequest = {
      proposal: 1,
      amount: 10,
      basis: "stake",
      contract_type: "CALL",
      currency: "USD",
      duration: 5,
      duration_unit: "t",
      symbol: "frxEURUSD",
    };

    ws.current.send(JSON.stringify(proposalRequest));
  };

  const buyContract = () => {
    if (!isLoggedIn) {
      console.error("You must log in first.");
      return;
    }

    if (!proposalData || !proposalData.id) {
      console.error("No valid proposal data to buy.");
      return;
    }

    const buyRequest = {
      buy: 1,
      price: proposalData.ask_price,
      parameters: {
        proposal_id: proposalData.id,
      },
    };

    ws.current.send(JSON.stringify(buyRequest));
  };

  return (
    <div>
      <h1>Buy/Sell Contracts</h1>
      <button onClick={requestProposal} disabled={!isLoggedIn}>
        Request Proposal
      </button>
      <button onClick={buyContract} disabled={!isLoggedIn}>
        Buy Contract
      </button>
      {buyError && <p style={{ color: "red" }}>Error: {buyError}</p>}
    </div>
  );
};

export default BuySellButton;
