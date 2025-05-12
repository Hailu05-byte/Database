import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/order");

      const data = Array.isArray(res.data) ? res.data : res.data.orders || [];
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch orders");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/order/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete order");
      console.error("Delete error:", err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2>Order Management</h2>

      {error && <div className="error-alert">{error}</div>}

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id || `${order.buyer_name}-${order.product_name}`}
                >
                  <td>{order.id}</td>
                  <td>{order.buyer_name || "N/A"}</td>
                  <td>{order.product_name || "N/A"}</td>
                  <td>{order.quantity ?? "N/A"}</td>
                  <td>Br{Number(order.total_price || 0).toFixed(2)}</td>
                  <td>
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className={`status-select ${
                        order.status?.toLowerCase() || "unknown"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
