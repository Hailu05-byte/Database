// components/Admin/AdminHome.jsx
import React from 'react';
import Dashboard from "../Admin/Dashboard";
import Orders from "../Admin/Orders";
import StockManagement from "../Admin/StockManagement";
import Home from "../Buyer/Home";
import Product from "../Buyer/Product";
import Checkout from "../Buyer/Checkout";

const BuyerDashboard = () => {
  return (
    <div>
      <h2>Buyer Dashboard</h2>
      <div style={{ border: '2px solid blue', padding: '10px' }}>
        <Home />
      </div>
      <div style={{ border: '2px solid green', padding: '10px' }}>
        <Product />
      </div>
      <div style={{ border: '2px solid orange', padding: '10px' }}>
        <Checkout />
      </div>
    </div>
  );
};

export default BuyerDashboard;
