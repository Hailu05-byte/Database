import  pool  from '../db.js';

const query = async (sql, params = []) => {
  
  if (typeof params === 'function') {
    throw new Error('Callback functions are not supported - use async/await instead');
  }
  if (!Array.isArray(params)) {
    throw new Error('Query parameters must be an array');
  }

  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database Error:', {
      sql,
      params: Array.isArray(params) ? params : 'INVALID_PARAMS',
      error: error.message,
      stack: error.stack
    });
    throw new Error('Database operation failed');
  } finally {
    connection.release();
  }
};

export default query;