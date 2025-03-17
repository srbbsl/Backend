import express from 'express';
import { createOrder, getAllOrder, getorderById, getOrderByUser } from '../controllers/orderController.js';
import { authCheck } from '../middleware/authCheck.js';

const router = express.Router();

router.route('/').get(getAllOrder).post(authCheck, createOrder);
router.route('/users/:id').get(authCheck, getOrderByUser);
router.route('/:id').get(authCheck, getorderById);


export default router;