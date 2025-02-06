import { Product } from "../models/Product.js";
import fs from 'fs';


export const getAllProduct = async (req, res) => {
   
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    };
};

export const createProduct = async (req, res) => {
    console.log(req.image);
    

    const { title, description, price, category, brand } = req.body;
    try {
        await Product.create({
            title,
            description,
            price: Number(price),
            category,
            brand,
            image: req.image,
        });
        return res.status(200).json({
            message: 'product created successfuly',
        });
    } catch (err) {
        fs.unlink(`./uploads/${req.image}`, (e) => {
            return res.status(400).json({
                message: `${err}`,
            });
        });
        
    };
   
};