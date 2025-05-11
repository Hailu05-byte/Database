import query from './query.js';

const getOrders = async (req, res) => {
  try {
    const orders = await query(`
      SELECT 
        id,
        buyer_name,
        email,
        address,
        city,
        paymentMethod,
        product_id,
        quantity,
        total_price,
        date,
        status
      FROM orders
      ORDER BY date DESC
    `);

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

export default getOrders;
