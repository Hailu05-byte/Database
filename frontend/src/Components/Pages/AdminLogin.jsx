import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ setUserRole }) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validEmail = 'admin@gmail.com';
  const validPassword = '12345';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === validEmail && values.password === validPassword) {
      setUserRole('admin');
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className='adminlogin'>Admin Login</h2>
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

export default AdminLogin;
