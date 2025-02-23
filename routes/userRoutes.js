import express from 'express';
import { userLogin, userRegister } from '../controllers/userController.js';
import { loginSchema, registerSchema, validate } from '../utils/validatior.js';


const router = express.Router();

router.route('/login').post(validate.body(loginSchema), userLogin);

router.route('/register').post(validate.body(registerSchema), userRegister);

export default router;