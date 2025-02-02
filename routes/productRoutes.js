import express from 'express';
import { getAllProduct } from '../controllers/productController.js';


const router = express.Router();

router.route('/').get(getAllProduct);



export default router;