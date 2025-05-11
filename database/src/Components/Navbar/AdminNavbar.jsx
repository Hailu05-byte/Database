
import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './AdminNavbar.css';

function AdminNavbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sticky, setSticky] = useState(false);

  const toggleMenu = () => {
    setMobileMenu(prev => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-container ${sticky ? 'dark-nav' : ''}`}>
      <div className="navbar-logo">
        <img src="/assets/logo21.jpg" alt="Logo" />
      </div>

      <ul className={`navbar-links ${mobileMenu ? 'show-mobile-menu' : 'hide-mobile-menu'}`}>
        <li>
          <ScrollLink to="dashboard" smooth={true} duration={500} offset={-70}>Dashboard</ScrollLink>
        </li>
        <li>
          <ScrollLink to="orders" smooth={true} duration={500} offset={-70}>Orders</ScrollLink>
        </li>
        <li>
          <ScrollLink to="stockmanagement" smooth={true} duration={500} offset={-70}>Stock Management</ScrollLink>
        </li>
      </ul>

      
    </nav>
  );
}

export default AdminNavbar;

