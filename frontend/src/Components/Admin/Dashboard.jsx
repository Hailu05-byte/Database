import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [profit, setProfit] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [leastProducts, setLeastProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboard = async () => {
      try {
        const [summaryRes, profitRes, stockRes, topRes, leastRes] =
          await Promise.all([
            axios.get(
              "http://localhost:3000/api/controllers/dashboard/getSummary",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "http://localhost:3000/api/controllers/dashboard/getMonthlyProfit",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "http://localhost:3000/api/controllers/dashboard/getLowStock",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "http://localhost:3000/api/controllers/dashboard/topSoldProducts",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            axios.get(
              "http://localhost:3000/api/controllers/dashboard/leastSoldProducts",
              { headers: { Authorization: `Bearer ${token}` } }
            ),
          ]);

        setSummary(summaryRes.data);
        console.log(profitRes.data);
        console.log(stockRes.data);
        setProfit(profitRes.data);
        setLowStock(stockRes.data);
        setTopProducts(topRes.data);
        setLeastProducts(leastRes.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="admin-container">
      <main className="dashboard-main">
        <h1 className="dashboard-title">📊 Admin Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>📦 Summary</h3>
            <div className="card-content">
              <p>
                <strong>Total Products:</strong> {summary.totalProducts || 0}
              </p>
              <p>
                <strong>Total Sales:</strong> {summary.totalSales || 0}
              </p>
              <p>
                <strong>Total Buyers:</strong> {summary.totalBuyers || 0}
              </p>
              <p>
                <strong>Pending Payments:</strong>{" "}
                {summary.pendingPayments || 0}
              </p>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>💰 Monthly Profit</h3>
            <div className="card-content">
              {profit.length > 0 ? (
                profit.map((p, i) => (
                  <p key={i}>
                    <strong>{p.month}:</strong> ${p.profit}
                  </p>
                ))
              ) : (
                <p>No profit data available</p>
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <h3>⚠️ Low Stock</h3>
            <div className="card-content">
              {lowStock.length === 0 ? (
                <p>All items are in stock ✅</p>
              ) : (
                lowStock.map((item) => (
                  <p key={item.id}>
                    <strong>{item.name}</strong> — Only{" "}
                    <span className="warning-text">{item.stock}</span> left
                  </p>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <h3>🏆 Top Products</h3>
            <div className="card-content">
              {topProducts.map((prod) => (
                <p key={prod.product_id}>
                  <strong>{prod.name}</strong> — {prod.total_sold} sold
                </p>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <h3>🧊 Least Sold</h3>
            <div className="card-content">
              {leastProducts.map((prod) => (
                <p key={prod.product_id}>
                  <strong>{prod.name}</strong> — {prod.total_sold} sold
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
