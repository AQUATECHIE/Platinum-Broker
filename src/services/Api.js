// /src/services/WebSocketService.js

class WebSocketService {
    constructor() {
      this.ws = null;
      this.callbacks = {};
      this.messageQueue = [];
      this.isConnected = false;
    }
  
    connect() {
      if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
        this.ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=67003');
  
        this.ws.onopen = () => {
          this.isConnected = true;
          // Send any queued messages
          while (this.messageQueue.length > 0) {
            this.ws.send(this.messageQueue.shift());
          }
        };
  
        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          this.emit(data.msg_type, data);
        };
  
        this.ws.onclose = () => {
          this.isConnected = false;
        };
      }
    }
  
    on(event, callback) {
      this.callbacks[event] = callback;
    }
  
    emit(event, data) {
      if (this.callbacks[event]) {
        this.callbacks[event](data);
      }
    }
  
    send(data) {
      const message = JSON.stringify(data);
      if (this.isConnected) {
        this.ws.send(message);
      } else {
        this.messageQueue.push(message);
      }
    }
  
    close() {
      if (this.ws) {
        this.ws.close();
      }
    }
  }
  
  export default new WebSocketService();
  