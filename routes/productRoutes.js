import express from 'express';
import { getAllProduct, addProduct, removeProduct, updateProduct, getProduct } from '../controllers/productController.js';
import { fileCheck, updateFileCheck } from '../middleware/fileCheck.js';
import { productSchema, validate } from '../utils/validatior.js';
import { adminCheck, authCheck } from '../middleware/authCheck.js';


const router = express.Router();

router.route('/')
    .get(getAllProduct)
    .post(adminCheck, fileCheck, validate.body(productSchema), authCheck, addProduct);

router.route('/:id')
    .get(getProduct)
    .patch(authCheck, adminCheck, updateFileCheck, updateProduct)
    .delete(authCheck, adminCheck, removeProduct);

export default router;