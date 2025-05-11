import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'project1',
  password: process.env.DB_PASSWORD || '34129594@1',
  database: process.env.DB_NAME || 'project1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log('✅ Database connection verified');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})();

export default pool;