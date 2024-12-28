import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login.jsx";
import Register from "./Component/Register.jsx";
import Dashboard from "./Component/Dashboard.jsx";

function App() {
  

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            <Route path="/dashboard" element = {<Dashboard />} />
          </Routes>
      </Router>
    </>
  )
}

export default App