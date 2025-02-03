import { Product } from "../models/Product.js";
import fs from 'fs';


export const getAllProduct = (req, res) => {
    return res.status(200).json({
        message: 'success'
    });
};

export const createProduct = async (req, res) => {
    // console.log(req.image)
    // return res.status(200).json({
    //     message: 'success'
    // });

    const { title, description, price, category, brand } = req.body
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
            message: 'product created successfully',
        });

    } catch (err) {
        fs.unlink(`./uploads/${req.image}`, (err) => {
            return res.status(400).json({
            message: `${err}`,
            });
        });
        
    };
};