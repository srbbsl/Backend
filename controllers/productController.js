import mongoose from "mongoose";
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

export const removeProduct = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) return res.status(400).json({
            message: 'please proviede valid id',
        });

        const isExist = await Product.findById(id);
        if(!isExist) return res.status(404).json({
            message: 'product not found',
        });

        await Product.findByIdAndDelete(id);

        fs.unlink(`./uploads/${isExist.image}`, (e) => {
            return res.status(200).json({
                message: 'product removed succesfully',
            });
        });

    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    };
};