import React, { useState } from 'react';
import './Home.css';
const Home = () => {
  const [featuredProducts] = useState([
    {
      id: 1,
      name: 'Digital Thermometer',
      price: 1500,
      category: 'Diagnostics',
      imageUrl: "/assets/thermometer.jpg",
    },
    {
      id: 2,
      name: 'Blood Pressure Monitor',
      price: 12000,
      category: 'Monitoring',
      imageUrl:"/assets/monitor.jpg",
    },
    {
      id: 3,
      name: 'Surgical Gloves',
      price: 250,
      category: 'Protective',
      imageUrl: "/assets/glove.jpg",
    },
    {
      id: 4,
      name: 'Ultrasound',
      price: 50000,
      category: 'Imaging',
      imageUrl: "/assets/ultrasound.jpg",
    },
  ]);
  const loading = false;
  const error = null;

  return (
    <div className="home-container">
      <header className="home-hero">
        <h1 className="hero-title">Hailu MD Medical Supplies</h1>
        <p className="hero-subtitle">
          Your trusted partner in high-quality wholesale medical equipment and supplies.
        </p>
      </header>
      <div className="image-about-container">
        <img src="/assets/MDimage1.png" alt="Medical Device" className="MDimage1" />
        <section className="about-section">
          <h2>About Us</h2>
          <p className="about">
            Welcome to Hailu MD, your trusted partner in medical equipment wholesale. We provide
            high-quality medical supplies to healthcare providers, ensuring they have the tools
            needed for exceptional patient care. With a focus on integrity and reliability, our
            extensive product range includes diagnostic equipment, surgical instruments, and more.
            Our dedicated team is here to support you with competitive pricing and timely delivery.
            Thank you for choosing Hailu MD — together, we advance healthcare!
          </p>
        </section>
      </div>
      <section className="featured-section">
        <h2>Featured Products</h2>

        {loading ? (
          <div className="loading">Loading featured products...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : featuredProducts.length > 0 ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Br{product.price.toLocaleString()}</p>
                  <p className="product-category">Category: {product.category}</p>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No featured products available.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
