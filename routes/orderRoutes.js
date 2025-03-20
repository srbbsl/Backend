import express from 'express';
import { createOrder, getAllOrder, getorderById, getOrderByUser } from '../controllers/orderController.js';
import { adminCheck, authCheck } from '../middleware/authCheck.js';

const router = express.Router();

router.route('/').get(authCheck, adminCheck, getAllOrder).post(authCheck, createOrder);
router.route('/users/:id').get(authCheck, getOrderByUser);
router.route('/:id').get(getorderById);


export default router;