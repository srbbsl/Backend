import { Product } from "../model/Product.js";
import fs from 'fs';
import mongoose from "mongoose";

export const getAllProduct = (req, res) => {
    return res.status(200).json({
        message: 'success',
    });
};

export const addProduct = async (req, res) => {
    const { title, description, price, category } = req.body;
    try {
        await Product.create({
            title,
            description,
            price,
            category,
            image: req.imagePath,
        });
        return res.status(200).json({
            message: 'product added successfully',
        });
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    }    
};

export const removeProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if(!mongoose.isValidObjectId(id)) return res.status(400).json({
            message: 'please provide valid id'
        });

        const product = await Product.findById(id);
        if(!product) return res.status(404).json({
            message: 'product not found',
        });

        await Product.findByIdAndDelete(id);
        fs.unlink(`./uploads${product.image}`, (err) => {
            if(err) return res.status(400).json({
                message: `${err}`,
            });
        });

        return res.status(200).json({
            message: 'product deleted successfully',
        });
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    }
};