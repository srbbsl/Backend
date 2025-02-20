import express from 'express';
import { getAllProducts, addProduct } from '../controllers/productController.js';
import { fileCheck } from '../middleware/fileCheck.js';


const router = express.Router();

router.route('/').get(getAllProducts).post(fileCheck, addProduct);

export default router;