import { Product } from "../model/Product.js";


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