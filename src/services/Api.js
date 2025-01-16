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

// /src/services/Api.js
export const sendProposalRequest = (webSocket, proposalParams) => {
  const proposalRequest = {
    proposal: 1,
    ...proposalParams,
  };

  webSocket.send(JSON.stringify(proposalRequest));
};

// Other existing exports
export const sendBuyRequest = () => {
  if (ws && ws.readyState === webSocket.OPEN) {
    const buyOrder = {
      type: 'buy',
      price: ohlcData[ohlcData.length - 1]?.close,
      timestamp: Date.now(),
    };
    ws.send(JSON.stringify(buyOrder))
  }
};

export const sendSellRequest = (webSocket, contractId) => {
  const sellRequest = {
    sell: contractId,
    price: 'acceptable_price',
  };

  webSocket.send(JSON.stringify(sellRequest));
};


// Functions for sending data are unchanged
