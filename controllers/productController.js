import { Product } from "../models/Product.js";
import fs from 'fs';


export const getAllProduct = (req, res) => {
    return res.status(200).json({
        message: 'success'
    });
};

export const createProduct = async (req, res) => {
    console.log(req.image);
    return res.status(200).json({
        message: 'success'
    });

   
};