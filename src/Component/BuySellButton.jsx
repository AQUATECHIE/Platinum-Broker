import React, { useState, useEffect, useRef } from "react";

const BuySellButton = () => {
  const ws = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [contracts, setContracts] = useState([]);
  const [proposal, setProposal] = useState(null);
  const [buyResponse, setBuyResponse] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=67003"
    );

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
      ws.current.send(
        JSON.stringify({
          authorize: "wA6UZI7JpPUWxHm", // Replace with a valid API token
        })
      );
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Authorization
      if (data.msg_type === "authorize") {
        console.log("Authorized successfully:", data.authorize);
        setIsLoggedIn(true);
        setAccountInfo(data.authorize);
        setErrorMessage("");
      }

      // Contracts for a Symbol
      if (data.msg_type === "contracts_for") {
        console.log("Contracts received:", data.contracts_for.available);
        setContracts(data.contracts_for.available);
      }

      // Proposal response
      if (data.msg_type === "proposal") {
        if (data.error) {
          console.error("Error in proposal response:", data.error.message);
          setErrorMessage(data.error.message);
        } else {
          console.log("Proposal received:", data.proposal);
          setProposal(data.proposal);
        }
      }

      // Buy response
      if (data.msg_type === "buy") {
        console.log("Buy response:", data.buy);
        setBuyResponse(data.buy);
      }

      // Errors
      if (data.error) {
        console.error("WebSocket error:", data.error.message);
        setErrorMessage(data.error.message);
      }
    };

    return () => ws.current.close();
  }, []);

  // Fetch available contracts for a symbol
  const fetchContracts = (symbol) => {
    ws.current.send(
      JSON.stringify({
        contracts_for: symbol,
        currency: accountInfo.currency,
      })
    );
  };

  // Request a proposal for a contract
  const requestProposal = (symbol, duration, duration_unit, payout) => {
    if (!symbol) {
      console.error("No valid symbol provided.");
      return;
    }
  
    const proposal = {
      proposal: 1,
      amount: payout,
      basis: "payout",
      contract_type: "CALL", // or "PUT"
      currency: "USD", // Use appropriate currency
      duration: duration,
      duration_unit: duration_unit,
      symbol: symbol, // Ensure this is valid
    };
  
    console.log("Sending proposal:", proposal);
    ws.current.send(JSON.stringify(proposal));
  };
  

  // Buy the contract
  const buyContract = () => {
    if (proposal) {
      ws.current.send(
        JSON.stringify({
          buy: proposal.id,
          price: proposal.ask_price,
        })
      );
    } else {
      setErrorMessage("No valid proposal to buy.");
    }
  };

  return (
    <div>
      <h1>Buy/Sell Contracts</h1>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {accountInfo?.fullname}!</p>
          <p>
            Balance: {accountInfo?.balance} {accountInfo?.currency}
          </p>

          {/* Fetch Contracts */}
          <div>
            <button onClick={() => fetchContracts("R_50")}>
              Get Contracts for R_50
            </button>
          </div>

          {/* Display Contracts */}
          <div>
            {contracts.map((contract, index) => (
              <div key={`${contract.contract_type}-${index}`}>
                <p>
                  {contract.contract_type} - {contract.contract_display_name}
                </p>
                <button
                  onClick={() =>
                    requestProposal(
                      contract.symbol,
                      1, // Example duration
                      "m", // Example duration unit (minutes)
                      10 // Example payout
                    )
                  }
                >
                  Request Proposal
                </button>
              </div>
            ))}
          </div>

          {/* Display Proposal */}
          {proposal && (
            <div>
              <h2>Proposal</h2>
              <p>Price: {proposal.ask_price}</p>
              <p>Type: {proposal.contract_type}</p>
              <p>
                Duration: {proposal.duration} {proposal.duration_unit}
              </p>
              <button onClick={buyContract}>Buy Contract</button>
            </div>
          )}

          {/* Display Buy Response */}
          {buyResponse && (
            <div>
              <h2>Buy Response</h2>
              <p>Contract ID: {buyResponse.contract_id}</p>
              <p>Buy Price: {buyResponse.buy_price}</p>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: "red" }}>
          {errorMessage || "User is not logged in. Please authorize."}
        </p>
      )}
    </div>
  );
};

export default BuySellButton;
