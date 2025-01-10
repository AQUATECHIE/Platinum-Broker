// /src/utils/websocket.js
export const createWebSocket = () => {
  const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=67003');
  
  ws.onopen = () => {
    console.log('WebSocket connection established.');
  };

  ws.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed.');
  };

  return ws;
};

export const sendProposalRequest = (ws, contractParams) => {
  ws.send(JSON.stringify(contractParams));
};

export const sendBuyRequest = (ws, proposalId) => {
  ws.send(JSON.stringify({
    buy: 1,
    price: 10,
    parameters: {
      proposal_id: proposalId
    }
  }));
};

export const sendSellRequest = (ws, contractId) => {
  ws.send(JSON.stringify({
    sell: contractId,
    price: "acceptable_price"
  }));
};
