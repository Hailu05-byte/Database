import query from '../controllers/query.js'; 
const getAllProducts = async (req, res) => {
  try {
    const sql = 'SELECT * FROM products';
    const results = await query(sql);
    res.status(200).json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


const insertProduct = async (req, res) => {
  console.log(req.body)
  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'All product fields are required' });
  }

  const sql = 'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)';
  try {
    const result = await query(sql, [name, price, stock]);
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};


const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { stock, price } = req.body;

  if (stock === undefined || price === undefined) {
    return res.status(400).json({ error: 'Stock and price are required' });
  }

  const sql = 'UPDATE products SET stock = ?, price = ? WHERE id = ?';
  try {
    await query(sql, [stock, price, id]);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM products WHERE id = ?';
  try {
    await query(sql, [id]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export {
  getAllProducts,
  insertProduct,
  updateProducts,
  deleteProduct
};
