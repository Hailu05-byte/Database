import query from './query.js';


export const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const [rows] = await query(
      `SELECT id, name, category, price, description, stock, supplier, specifications, image_url AS imageUrl
       FROM products
       WHERE id = ?`,
      [productId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await query(
      `SELECT id, name, category, price, description, stock, supplier, specifications, image_url AS imageUrl
       FROM products`
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
