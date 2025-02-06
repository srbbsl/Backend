import express from 'express';
import { createProduct, getAllProduct, removeProduct  } from '../controllers/productController.js';
import { checkAdmin, checkUser } from '../middleware/checkAuth.js';
import { checkFile } from '../middleware/checkFile.js';
import Joi from 'joi';
import validate from 'express-joi-validation';

const router = express.Router();

const validator = validate.createValidator();

const productSchema = Joi.object({
    title: Joi.string().min(4).max(20).required(),
    description: Joi.string().min(4).max(20).required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
});

router.route('/').get(getAllProduct).post(checkUser, checkAdmin, validator.body(productSchema), checkFile, createProduct);

router.route('/:id').get(getAllProduct).delete(checkUser, checkAdmin, removeProduct);

export default router;