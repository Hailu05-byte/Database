
import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll'; 
import './BuyerNavbar.css';

function BuyerNavbar() {
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
          <ScrollLink to="home" smooth={true} duration={500} offset={-70}>Home</ScrollLink>
        </li>
        <li>
          <ScrollLink to="product" smooth={true} duration={500} offset={-70}>Product</ScrollLink>
        </li>
        <li>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>Contact</ScrollLink>
        </li>
      </ul>

     
    </nav>
  );
}

export default BuyerNavbar;

