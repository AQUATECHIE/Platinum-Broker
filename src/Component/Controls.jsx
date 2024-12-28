import React from "react";
import '../Style/Controls.css'

function Controls() {
  return (
    <div className="controls-container">
      <div className="controls-settings">
        <div>
          <label>Expiração</label>
          <div className="control-buttons">
            <button>-</button>
            <span>1m</span>
            <button>+</button>
          </div>
        </div>
        <div>
          <label>Investimento</label>
          <div className="control-buttons">
            <button>-</button>
            <span>R$1.00</span>
            <button>+</button>
          </div>
        </div>
      </div>
      <div className="payment-section">
        <label>Seu pagamento</label>
        <div className="payment-value">R$1.84</div>
      </div>
      <div className="action-buttons">
        <button className="buy-button">COMPRAR</button>
        <button className="sell-button">VENDER</button>
      </div>
    </div>
  );
}

export default Controls;
