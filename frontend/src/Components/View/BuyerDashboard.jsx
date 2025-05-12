// components/Admin/AdminHome.jsx
import React from "react";
import Dashboard from "../Admin/Dashboard";
import Orders from "../Admin/Orders";
import StockManagement from "../Admin/StockManagement";
import Home from "../User/Home";
import Product from "../User/Product";
import contact from "../User/Contact";

const BuyerDashboard = () => {
  return (
    <div>
      <h2>Buyer Dashboard</h2>
      <div style={{ border: "2px solid blue", padding: "10px" }}>
        <Home />
      </div>
      <div style={{ border: "2px solid green", padding: "10px" }}>
        <Product />
      </div>
      <div style={{ border: "2px solid orange", padding: "10px" }}>
        <contact />
      </div>
    </div>
  );
};

export default BuyerDashboard;
