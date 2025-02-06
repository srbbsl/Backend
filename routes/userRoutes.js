import express from 'express';
import { getUserProfile, userLogin, userRegister } from '../controllers/userController.js';
import Joi from 'joi';
import validate from 'express-joi-validation';

const router = express.Router();

const validator = validate.createValidator();

const common = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

const loginSchema = Joi.object({...common})

const registerSchema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    ...common,
});

router.route('/login').post(validator.body(loginSchema), userLogin);
router.route('/register').post(validator.body(registerSchema), userRegister);
router.route('/:id').get(getUserProfile);

export default router;