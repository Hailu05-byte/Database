import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Dashboard from "./Components/Admin/Dashboard";
import Orders from "./Components/Admin/Orders";
import StockManagement from "./Components/Admin/StockManagement";
import Home from "./Components/Buyer/Home";
import Product from "./Components/Buyer/Product";
import Checkout from "./Components/Buyer/Checkout";
import Start from "./Components/pages/Start";
import AdminLogin from "./Components/pages/AdminLogin";
import BuyerLogin from "./Components/Pages/BuyerLogin";
import "./App.css";
import BuyerNavbar from './Components/Navbar/BuyerNavbar';
import AdminNavbar from './Components/Navbar/AdminNavbar';
import CombinedView from './Components/View/BuyerDashboard';



const AppWrapper= () => {
  const [userRole, setUserRole] = useState(null); 

  return (
    <Router>
      <App userRole={userRole} setUserRole={setUserRole} />
    </Router>
  );
};



function App({ userRole, setUserRole }) {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/adminlogin', '/buyerlogin'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && userRole === 'admin' && <AdminNavbar />}
      {!hideNavbar && userRole === 'buyer' && <BuyerNavbar />}

      <div className="main-content">
        <Routes>
          
          <Route path="/" element={<Start />} />
          <Route path="/adminlogin" element={<AdminLogin setUserRole={setUserRole} />} />
          <Route path="/buyerlogin" element={<BuyerLogin setUserRole={setUserRole} />} />

          
          {userRole === 'admin' && (
            <Route path="/admin" element={
              <div className="admin-layout">
               <div id="dashboard">
                  <Dashboard />
                </div>

              <div id="orders">
               <Orders />
            </div>

          <div id="stockmanagement">
                <StockManagement />
            </div>

              </div>
            } />
          )}

         
          {userRole === 'buyer' && (
            <Route path="/buyer" element={
              <div className="buyer-layout">
                <div id="home">
                  <Home />
                </div>
              <div id="product">
                  <Product />
                </div>
            <div id="checkout">
              <Checkout />
                </div>

                
              </div>
            } />
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default AppWrapper;