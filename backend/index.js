import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboard from './routes/dashboard.js';
import order from './routes/order.js'
import product from './routes/product.js'
import StockManagement from './routes/StockManagement.js';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/controllers/dashboard', dashboard);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/stockManagement', StockManagement);

async function startServer() {
  try {
    
    console.log('✅ Connected and initialized');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();