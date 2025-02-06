import express from 'express';
import { createProduct, getAllProduct  } from '../controllers/productController.js';
import { checkAdmin, checkUser } from '../middleware/checkAuth.js';
import { checkFile } from '../middleware/checkFile.js';

const router = express.Router();

router.route('/').get(getAllProduct).post(checkFile, createProduct);

export default router;