import express from 'express';
import { getAllProduct  } from '../controllers/productController.js';
import { checkAdmin, checkUser } from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/').get(checkUser, checkAdmin, getAllProduct);

export default router;