import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Start.css';

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Login As</h2>
        <div className="login-buttons">
          <button onClick={() => navigate('/buyerlogin')}>User</button>
          <button onClick={() => navigate('/adminlogin')}>Admin</button>
        </div>
      </div>
    </div>
  );
};

export default Start;


