import express from 'express';
import { getAllProduct, addProduct, removeProduct } from '../controllers/productController.js';
import { fileCheck } from '../middleware/fileCheck.js';
import { productSchema, validate } from '../utils/validatior.js';


const router = express.Router();

router.route('/')
    .get(getAllProduct)
    .post(validate.body(productSchema), fileCheck, addProduct);

router.route('/:id')
    .delete(removeProduct);

export default router;