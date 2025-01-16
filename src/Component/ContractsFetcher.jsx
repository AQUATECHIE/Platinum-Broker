// ContractsFetcher.jsx
import React, { useEffect, useState } from 'react';

const ContractsFetcher = ({ symbol, onContractsFetched }) => {
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=67003');

      ws.onopen = () => {
        ws.send(JSON.stringify({
          contracts_for: symbol,
          currency: 'USD',
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.error) {
          console.error('Error fetching contracts:', data.error.message);
        } else if (data.msg_type === 'contracts_for') {
          setContracts(data.contracts_for.available);
          onContractsFetched(data.contracts_for.available);
        }
        ws.close();
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    };

    fetchContracts();
  }, [symbol, onContractsFetched]);

  if (!contracts) {
    return <div>Loading contracts...</div>;
  }

  return (
    <div>
      <h3>Available Contracts for {symbol}</h3>
      {/* <ul>
        {contracts.map((contract) => (
          <li key={contract.contract_type}>
            {contract.contract_display} - Min Duration: {contract.min_contract_duration}, Max Duration: {contract.max_contract_duration}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ContractsFetcher;
