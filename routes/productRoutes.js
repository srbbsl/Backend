import express from 'express';
import { getAllProduct, addProduct, removeProduct, updateProduct } from '../controllers/productController.js';
import { fileCheck, updateFileCheck } from '../middleware/fileCheck.js';
import { productSchema, validate } from '../utils/validatior.js';


const router = express.Router();

router.route('/')
    .get(getAllProduct)
    .post(validate.body(productSchema), fileCheck, addProduct);

router.route('/:id')
    .patch(validate.body(productSchema), updateFileCheck, updateProduct)
    .delete(removeProduct);

export default router;