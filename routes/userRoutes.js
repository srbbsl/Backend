import express from 'express';
import { getUser, updateUser, userLogin, userRegister } from '../controllers/userController.js';
import { loginSchema, registerSchema, validate } from '../utils/validatior.js';
import { authCheck } from '../middleware/authCheck.js';


const router = express.Router();

router.route('/login').post(validate.body(loginSchema), userLogin);

router.route('/register').post(validate.body(registerSchema), userRegister);

router.route('/:id').get(authCheck, getUser).patch(authCheck, updateUser);

export default router;