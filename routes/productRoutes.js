import express from 'express';
import { getAllProducts, addProduct, removeProduct } from '../controllers/productController.js';
import { fileCheck } from '../middleware/fileCheck.js';
import { productSchema, validate } from '../utilities/validators.js';


const router = express.Router();

router.route('/').get(getAllProducts).post(validate.body(productSchema), fileCheck, addProduct);

router.route('/:id').delete(removeProduct);

export default router;