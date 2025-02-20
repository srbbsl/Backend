import Joi from "joi";
import validator from 'express-joi-validation';

export const validate =  validator.createValidator({});

const authSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const loginSchema = Joi.object({
    ...authSchema
});

export const registerSchema = Joi.object({
    username: Joi.string().min(4).required(),
    ...authSchema
});