import express from 'express';
import db from '../db.js';
import getOrders from '../controllers/order.js';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.*, p.name AS product_name 
      FROM orders o
      LEFT JOIN products p ON o.product_id = p.id
      ORDER BY o.date DESC
    `);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


router.post('/place', async (req, res) => {
  try {
    const orders = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: 'Request body must be a non-empty array' });
    }

    const insertSql = `
      INSERT INTO orders (
        buyer_name, product_id, product_name, 
        email, address, city, paymentMethod,
        quantity, total_price, date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertedOrders = [];

    for (const order of orders) {
      const {
        buyer_name,
        product_id,
        product_name,
        email,
        address,
        city,
        paymentMethod,
        quantity,
        total_price,
        date = new Date().toISOString().split('T')[0]
      } = order;

      
      if (!buyer_name || !product_id || !quantity || !total_price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const [result] = await db.execute(insertSql, [
        buyer_name,
        product_id,
        product_name,
        email,
        address,
        city,
        paymentMethod,
        quantity,
        total_price,
        date,
        'Pending'
      ]);

      insertedOrders.push({
        id: result.insertId,
        ...order
      });
    }

    res.status(201).json({
      message: 'Orders created successfully',
      orders: insertedOrders
    });

  } catch (error) {
    console.error('Error creating orders:', error);
    res.status(500).json({ error: 'Failed to create orders' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [order] = await db.query(
      'SELECT id FROM orders WHERE id = ?', 
      [id]
    );

    if (!order.length) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await db.query('DELETE FROM orders WHERE id = ?', [id]);

    res.json({ message: 'Order deleted successfully' });

  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

export default router;
