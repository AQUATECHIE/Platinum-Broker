import React from "react";
import '../Style/Sidebar.css'
import logo from '../assets/Logo.jpg'

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <ul className="sidebar-menu">
        <li>Investir</li>
        <li>Histórico</li>
        <li>Depósito</li>
        <li>Top Traders</li>
        <li>Minha Conta</li>
        <li>Ajuda</li>
      </ul>
    </div>
  );
}

export default Sidebar;
