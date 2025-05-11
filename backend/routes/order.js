import express from 'express';
import db from '../db.js';
import getOrders from '../controllers/order.js';
const router = express.Router();
router.get('/', getOrders);
router.post('/place', async (req, res) => {
  try {
    const orders = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
      console.log("not array")
      return res.status(400).json({ error: 'Request body must be a non-empty array of orders' });
    }

    const insertSql = `
      INSERT INTO orders 
        (buyer_id, buyer_name, email, address, city, paymentMethod,
         product_id, quantity, total_price, date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;

    const insertedOrderIds = [];

    for (const order of orders) {
      console.log(order)
      const {
        buyer_id = null, 
        buyer_name,
        email,
        address,
        city,
        paymentMethod,
        product_id,
        quantity,
        total_price,
        date
      } = order;

      
      if (
        !buyer_name ||
        !email ||
        !address ||
        !city ||
        !paymentMethod ||
        typeof product_id !== 'number' ||
        typeof quantity !== 'number' ||
        
        !date
      ) {
        console.log("invalid")
        return res.status(400).json({ error: 'Missing or invalid order parameters' });
      }

      const [result] = await db.execute(insertSql, [
        buyer_id,
        buyer_name,
        email,
        address,
        city,
        paymentMethod,
        product_id,
        quantity,
        total_price,
        date
      ]);

      insertedOrderIds.push(result.insertId);
    }

    return res.status(201).json({
      message: 'All orders placed successfully',
      orderIds: insertedOrderIds
    });

  } catch (error) {
    console.error('Error placing orders:', error);
    return res.status(500).json({ error: 'Failed to place orders' });
  }
});

export default router