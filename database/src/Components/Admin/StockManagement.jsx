import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockManagement.css';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:3000/api/stockManagement';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/getAllProducts`, {
        headers: { Authorization: token },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Fetch error:', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; 
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: token } };

      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/updateProducts/${editingId}`,
          formData,
          config
        );
      } else {
        await axios.post(`${API_BASE_URL}/insertProduct`, formData, config);
      }

      await loadProducts();
      setFormData({ name: '', price: '', stock: '' });
      setEditingId(null);
      setError('');
    } catch (err) {
      setError(editingId ? 'Failed to update product' : 'Failed to add product');
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/deleteProduct/${id}`, {
        headers: { Authorization: token },
      });
      await loadProducts();
      setError('');
    } catch (err) {
      setError('Failed to delete product');
      console.error('Delete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setEditingId(product.id);
  };

  const handleCancel = () => {
    setFormData({ name: '', price: '', stock: '' });
    setEditingId(null);
  };

  return (
    <div className="stock-management">
      <h2>Stock Management</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="product-form">
        <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={!!editingId}
            />
          </div>
          <div className="form-group">
            <label>Price (Br)</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
              disabled={!!editingId}
            />
          </div>
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="primary-btn" disabled={isLoading}>
  {isLoading ? 'Processing...' : (editingId ? 'Update Stock' : 'Add Product')}
</button>
{editingId && (
  <button type="button" className="cancel-btn" onClick={handleCancel} disabled={isLoading}>
    Cancel
  </button>
)}
        </form>
      </div>

      <div className="product-list">
        <h3>Current Products</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="stock-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price (Br)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4">No products available.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(product)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StockManagement;
