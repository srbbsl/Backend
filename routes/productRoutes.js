import express from 'express';
import { getAllProduct, addProduct } from '../controllers/productController.js';
import { fileCheck } from '../middleware/fileCheck.js';
import { productSchema, validate } from '../utils/validatior.js';


const router = express.Router();

router.route('/products')
.get(getAllProduct)
.post(validate.body(productSchema), fileCheck, addProduct);

export default router;