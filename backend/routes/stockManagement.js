import express from 'express';

import { getAllProducts,insertProduct,updateProducts,deleteProduct} from '../controllers/stockManagement.js';
const router = express.Router();
// Define routes
router.get('/getAllProducts', getAllProducts);
router.post('/insertProduct', insertProduct);
router.put('/updateProducts/:id', updateProducts);
router.delete('/deleteProduct/:id', deleteProduct);

export default  router;
