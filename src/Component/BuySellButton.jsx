import React, { useEffect, useState, useRef } from "react";


const BuySellButtons = () => {
  const app_id = 67003; // Replace with your app_id.
  const token = "S0AwMN03iKvFJeE"; // Replace with your API token.
  const ws = useRef(null);

  const [balance, setBalance] = useState(null);
  
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    ws.current = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`);
    ws.current.onopen = () => ws.current.send(JSON.stringify({ authorize: token }));
    
    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log("WebSocket Response:", data);
     if (data.error) {
        console.error("Error:", data.error.message);
      } else if (data.msg_type === "authorize") {
        ws.current.send(JSON.stringify({ balance: 1, subscribe: 1 }));
      } else if (data.msg_type === "balance") {
        setBalance(data.balance.balance);
      } else if (data.msg_type === "buy") {
        console.log("Buy successful", data);
        setTradeHistory((prev) => [...prev, { time: new Date(), price: data.buy.buy_price }]);
      }
    };

    return () => ws.current.close();
  }, []);

  const buyContract = () => {
    const buyRequest = {
      buy: 1,
      price: 10, // Maximum stake or payout
      contract_type: "CALL",
      symbol: "R_100",
      duration: 5,
      duration_unit: "t",
      basis: "stake",
      stake: 10,
      currency: "USD"
    };
  
    console.log("Sending buy request:", buyRequest); // Debugging request
    ws.current.send(JSON.stringify(buyRequest));
  };
  

  

  return (
    <div>
      <h2>Deriv Trading</h2>
      <p>Balance: {balance !== null ? `$${balance}` : "Loading..."}</p>
      <button onClick={buyContract}>Buy Contract</button>
    </div>
  );
};

export default BuySellButtons;
