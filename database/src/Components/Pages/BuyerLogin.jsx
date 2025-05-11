
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerLogin.css';

const BuyerLogin = ({ setUserRole }) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validEmail = 'hayilu5@gmail.com';
  const validPassword = '123456';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === validEmail && values.password === validPassword) {
      setUserRole('buyer'); 
      navigate('/buyer');
      } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="buyer-login-container">
      <div className="buyer-login-box">
        <h2 className='buerlogin'>User Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
          <div className="terms">
            <input type="checkbox" required />
            <label>I agree to the terms and conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerLogin;
