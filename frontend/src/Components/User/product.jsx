import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showcontact, setShowcontact] = useState(false);
  const [buyerIds, setBuyerIds] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/stockManagement/getAllProducts")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setSelectedProduct(null);
  };

  const handleBuyerInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const orderData = cart.map((item) => ({
      buyer_name: buyerInfo.fullName,
      email: buyerInfo.email,
      address: buyerInfo.address,
      city: buyerInfo.city,
      paymentMethod: buyerInfo.paymentMethod,
      product_id: item.id,
      product_name: item.name,
      quantity: 1,
      total_price: item.price,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    }));
    console.log("added something");
    try {
      console.log("something lllll");
      const res = await axios.post(
        "http://localhost:3000/api/order/place",
        orderData
      );
      console.log(res.data);
      const returnedBuyerIds = res.data;
      setBuyerIds(returnedBuyerIds);

      alert("Order placed successfully!");
      setCart([]);
      setBuyerInfo({
        fullName: "",
        email: "",
        address: "",
        city: "",
        paymentMethod: "card",
      });
      setShowcontact(false);
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="pc-container">
      {!showcontact ? (
        <>
          <h2 className="pc-title">Available Products</h2>
          <div className="pc-list">
            {products.map((product) => (
              <div key={product.id} className="pc-card">
                <img
                  src={product.imageUrl || "/assets/default.jpg"}
                  alt={product.name}
                  className="pc-card-img"
                />
                <h3 className="pc-card-name">{product.name}</h3>
                <p className="pc-card-price">Br{product.price}</p>
                <p className="pc-card-cat">
                  Category: {product.category || "Diagnostic"}
                </p>
                <button
                  className="pc-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {selectedProduct && (
            <div className="pc-popup">
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p>
                <strong>Specifications:</strong>{" "}
                {selectedProduct.specifications}
              </p>
              <p>
                <strong>Stock:</strong> {selectedProduct.stock}
              </p>
              <p>
                <strong>Supplier:</strong> {selectedProduct.supplier}
              </p>
              <div className="pc-popup-actions">
                <button
                  className="pc-btn"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
                <button
                  className="pc-btn pc-btn-close"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <div className="pc-cart">
              <h3>Your Cart</h3>
              <ul className="pc-cart-list">
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>

              <div className="pc-buyer-form">
                <h4>Enter Your Details</h4>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={buyerInfo.fullName}
                  onChange={handleBuyerInputChange}
                  className="pc-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={buyerInfo.email}
                  onChange={handleBuyerInputChange}
                  className="pc-input"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={buyerInfo.address}
                  onChange={handleBuyerInputChange}
                  className="pc-input"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={buyerInfo.city}
                  onChange={handleBuyerInputChange}
                  className="pc-input"
                  required
                />
              </div>

              <button
                className="pc-btn contact-btn"
                onClick={() => setShowcontact(true)}
              >
                Proceed to contact
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="pc-contact">
          <h2>Order Summary</h2>
          <div className="pc-summary-form-layout">
            {cart.map((item, index) => (
              <div key={index} className="pc-summary-item">
                <div>
                  <strong>Buyer ID:</strong> {buyerIds[index] || "1"}
                </div>{" "}
                {/* 🔹 Show order ID */}
                <div>
                  <strong>Buyer:</strong> {buyerInfo.fullName}
                </div>
                <div>
                  <strong>Product:</strong> {item.name}
                </div>
                <div>
                  <strong>Quantity:</strong> 1
                </div>
                <div>
                  <strong>Price:</strong> Br{item.price}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date().toISOString().split("T")[0]}
                </div>
                <div>
                  <strong>Status:</strong> Pending
                </div>
                <hr />
              </div>
            ))}
            <form onSubmit={handleSubmitOrder}>
              <button type="submit" className="pc-btn pc-submit">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
