import React, { useState } from "react";

const BuySellButton = ({ symbol, contracts }) => {
  const [selectedContract, setSelectedContract] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [proposal, setProposal] = useState(null);
  const apiToken = "pRzG9yBetZNnLv1"; // Replace with your actual API token

  const handleBuy = () => {
    const contract = contracts.find(
      (c) => c.contract_type === selectedContract
    );
    if (!contract) {
      alert("Invalid contract type selected.");
      return;
    }

    const minDuration = parseInt(contract.min_contract_duration);
    const maxDuration = parseInt(contract.max_contract_duration);
    const selectedDuration = parseInt(duration);

    if (selectedDuration < minDuration || selectedDuration > maxDuration) {
      alert(`Duration must be between ${minDuration} and ${maxDuration}.`);
      return;
    }

    const ws = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=67003"
    );

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          authorize: apiToken, // Send the authorization request with the token
        })
      );

      ws.send(
        JSON.stringify({
          proposal: 1,
          amount: parseFloat(amount),
          basis: "stake",
          contract_type: selectedContract,
          currency: "USD",
          duration: selectedDuration,
          duration_unit: "t",
          symbol: symbol,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error("Error in proposal response:", data.error.message);
        alert(`Error: ${data.error.message}`);
      } else if (data.proposal) {
        console.log("Proposal received:", data.proposal);
        setProposal(data.proposal);
      }
      ws.close();
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  };

  const confirmBuy = () => {
    const ws = new WebSocket(
      "wss://ws.binaryws.com/websockets/v3?app_id=67003"
    );
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          authorize: apiToken, // Send the authorization request with the token
        })
      );

      ws.send(
        JSON.stringify({
          buy: proposal.id,
          price: proposal.ask_price,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error("Error in buy response:", data.error.message);
        alert(`Error: ${data.error.message}`);
      } else {
        console.log("Buy successful:", data);
        alert("Contract purchased successfully!");
      }
      ws.close();
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  };

  return (
    <div>
      <h3>Buy Contract</h3>
      <div>
        <label>
          Contract Type:
          <select
            value={selectedContract}
            onChange={(e) => setSelectedContract(e.target.value)}
          >
            <option value="">Select Contract</option>
            {contracts.map((contract, index) => (
              <option
                key={`${contract.contract_type}-${index}`} // Combine contract type and index for uniqueness
                value={contract.contract_type}
              >
                {contract.contract_display}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Duration:
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </label>
      </div>
      <button onClick={handleBuy}>Request Proposal</button>

      {proposal && (
        <div>
          <h4>Proposal Details</h4>
          <p>Price: {proposal.ask_price}</p>
          <p>Start: {new Date(proposal.date_start * 1000).toLocaleString()}</p>
          <p>
            Expiry: {new Date(proposal.date_expiry * 1000).toLocaleString()}
          </p>
          <button onClick={confirmBuy}>Confirm Buy</button>
        </div>
      )}
    </div>
  );
};

export default BuySellButton;
