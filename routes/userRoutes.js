import express from 'express';
import { userRegister } from '../controllers/userController.js';



const router = express.Router();

router.route('/login').post();

router.route('/register').post(userRegister);

export default router;