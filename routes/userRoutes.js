import express from 'express';
import { getUserProfile, userLogin, userRegister } from '../controllers/userController.js';

const router = express.Router();

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route('/:id').get(getUserProfile);

export default router;