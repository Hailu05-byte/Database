
import express from 'express';
import { getProductById, getAllProducts } from '../controllers/product.js';

const router = express.Router();
router.get('/getProductById/:id', getProductById);
router.get('/getAllProducts', getAllProducts);

export default router;
