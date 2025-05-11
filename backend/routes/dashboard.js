import express from 'express';
const router = express.Router(); 
import {getSummary, getMonthlyProfit, getLowStock, getTopSoldProducts, getLeastSoldProducts}  from '../controllers/dashboard.js';
router.get('/getSummary', getSummary);
router.get('/getMonthlyProfit', getMonthlyProfit);
router.get('/getLowStock', getLowStock);
router.get('/topSoldProducts', getTopSoldProducts);
router.get('/leastSoldProducts', getLeastSoldProducts);

export default router;
