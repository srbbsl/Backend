import express from 'express';
import { createOrder, getAllOrder, getorderById, getOrderByUser } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').get(getAllOrder).post(createOrder);
router.route('/users/:id').get(getOrderByUser);
router.route('/:id').get(getorderById);


export default router;