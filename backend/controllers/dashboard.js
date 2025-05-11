import express from 'express';
import query from './query.js';


export const getSummary = async (req, res) => {
  try {
    const [productCount] = await query('SELECT COUNT(*) AS totalProducts FROM products');
    const [salesCount] = await query('SELECT COUNT(*) AS totalSales FROM orders');
    const [buyerCount] = await query('SELECT COUNT(DISTINCT buyer_id) AS totalBuyers FROM orders');
    const [pendingPayments] = await query("SELECT COUNT(*) AS pendingPayments FROM orders WHERE status = 'pending'");
    console.log(productCount)
    console.log(salesCount)
    console.log(buyerCount)
    console.log(pendingPayments)

    res.json({
      totalProducts: productCount.totalProducts,
      totalSales: salesCount.totalSales,
      totalBuyers: buyerCount.totalBuyers,
      pendingPayments: pendingPayments.pendingPayments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

export const getMonthlyProfit = async (req, res) => {
  try {
    const [result] = await query(`
      SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(total_price) AS profit
      FROM orders
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly profit' });
  }
};

export const getLowStock = async (req, res) => {
  try {
    const result = await query('SELECT id, name, stock FROM products WHERE stock < 5 ORDER BY stock ASC');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch low stock products' });
  }
};

export const getTopSoldProducts = async (req, res) => {
  try {
    const result = await query(`
      SELECT p.id as product_id, p.name, SUM(o.quantity) AS total_sold
      FROM orders o
      JOIN products p ON o.product_id = p.id
      GROUP BY o.product_id
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top sold products' });
  }
};

export const getLeastSoldProducts = async (req, res) => {
  try {
    const result = await query(`
      SELECT p.id as product_id, p.name, SUM(o.quantity) AS total_sold
      FROM orders o
      JOIN products p ON o.product_id = p.id
      GROUP BY o.product_id
      ORDER BY total_sold ASC
      LIMIT 5
    `);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch least sold products' });
  }
};




