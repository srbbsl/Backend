import { Product } from "../model/Product.js";
import fs from 'fs';
import mongoose from "mongoose";

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products)
    } catch (err) {
        return res.status(400).json({ message: `${err}`})
    }
   
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


//yo class ma sir ko feb 21.1 vid ma xa yesma invalid id pathauda msg xai provid valid id ayo tara uploads ma image ayo. check it again.
// export const updateProduct = async (req, res) => {
//     const { title, description, price, category } = req.body;
//     const { id } = req.params;
//     try {
//         if(!mongoose.isValidObjectId(id)) return res.status(400).json({
//             message: 'please provide valid id',
//         });

//         const product = await Product.findById(id);
//         if(!product) return res.status(404).json({
//             message: 'product not found',
//         });

//         product.title = title || product.title;
//         product.description = description || product.description;
//         product.price = price || product.price;
//         product.category = category || product.category;
        

//         if(req.imagePath) {
//             fs.unlink(`./uploads${product.image}`, async (err) => {
//                 if(err) return res.status(400).json({
//                     message: `${err}`,
//                 });
//                 product.image = req.imagePath;
//                 await product.save();
               
//                 return res.status(200).json({
//                     message: 'product updated successfully',
//                 });
//             });
//         } else {
            
//             await product.save();
           
//             return res.status(200).json({
//                 message: 'product updated successfully',
//             });
//         }
//     } catch (err) {
//         return res.status(400).json({
//             message: `${err}`,
//         });
//     }
//     };

export const updateProduct = async (req, res) => {
    const { title, description, price, category } = req.body;
    const { id } = req.params;
    const product = req.product; // Retrieved from updateFileCheck

    try {
        // 🔹 Delete old image if new image is uploaded
        if (req.imagePath) {
            fs.unlink(`./uploads${product.image}`, (err) => {
                if (err) {
                    return res.status(400).json({ message: `Error deleting old image: ${err}` });
                }
            });
        }

        // 🔹 Update product details
        await Product.findByIdAndUpdate(id, {
            title: title || product.title,
            description: description || product.description,
            price: price || product.price,
            category: category || product.category,
            image: req.imagePath || product.image,
        });

        return res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        return res.status(500).json({ message: `Server error: ${err.message}` });
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