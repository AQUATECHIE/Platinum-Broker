import React, { useState, useEffect } from "react";
import '.././services/Api.js'
import '../Style/Controls.css'

function Controls({ updateChart }) {
  const [investment, setInvestment] = useState(1.0);
  const [expiration, setExpiration] = useState("1m");
  const [payment, setPayment] = useState(1.84);

  const handleBuy = async () => {
    try {
      const response = await api.buy(investment, expiration);
      const data = await response.json();
      if (response.ok) {
        setPayment(data.updatedPayment);
        updateChart("buy", investment); // Update chart with buy data
        alert("Compra realizada com sucesso!");
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Não foi possível completar a compra.");
    }
  };

  const handleSell = async () => {
    try {
      const response = await api.sell(investment, expiration);
      const data = await response.json();
      if (response.ok) {
        setPayment(data.updatedPayment);
        updateChart("sell", investment); // Update chart with sell data
        alert("Venda realizada com sucesso!");
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Não foi possível completar a venda.");
    }
  };

  return (
    <div className="controls-container">
      {/* Other Controls */}
      <button className="buy-button" onClick={handleBuy}>COMPRAR</button>
      <button className="sell-button" onClick={handleSell}>VENDER</button>
    </div>
  );
}

export default Controls;
