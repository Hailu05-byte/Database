import React from 'react';
import './Checkout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>MedEquip Wholesalers</h3>
          <p>Reliable provider of high-quality medical equipment for healthcare professionals across the nation.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
  <h4>Contact Us</h4>
  <p data-tooltip="Email: hailuw@gmail.com">Email: hailuw@gmail.com</p>
  <p data-tooltip="Phone: +251 34 12 95 94">Phone: +251 34 12 95 94</p>
  <p data-tooltip="Address: 5Kilo">Address: 5Kilo</p>
</div>

<div className="footer-section social">
  <h4>Follow Us</h4>
  <div className="social-icons">
    <a href="#" data-tooltip="Facebook"><i className="fab fa-facebook-f"></i></a>
    <a href="#" data-tooltip="Twitter"><i className="fab fa-twitter"></i></a>
    <a href="#" data-tooltip="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
    <a href="#" data-tooltip="Instagram"><i className="fab fa-instagram"></i></a>
  </div>
</div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MedEquip Wholesalers | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

