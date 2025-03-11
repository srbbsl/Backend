import { v4 as uuidv4 } from 'uuid';
import { Product } from '../model/Product.js';
import mongoose from 'mongoose';


const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg', 'image/webp', 'image/avif'];
export const fileCheck = (req, res, next) => {
    // console.log('hello')
    const file = req.files?.image;
        if(!file) return res.status(400).json({ message: 'image is required' });
    // console.log(file)
        if(!imageTypes.includes(file.mimetype)) return res.status(400).json({ message: 'provide valid image type' });

    const imagePath = `/${uuidv4()}-${file.name}`;    

    file.mv(`./uploads${imagePath}`, (err) => {
        if(err) return res.status(400).json({ message: `${err}` });
        req.imagePath = imagePath; //req object ma naya key ra value add gareko
        return next();  
    });
    
};


// export const updateFileCheck = async (req, res, next) => {
//     const { id } = req.params;
    
//     // 🔹 Validate ID before handling file
//     if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({ message: 'Please provide a valid ID' });
//     }

//     // 🔹 Check if product exists
//     const product = await Product.findById(id);
//     if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//     }

//     req.product = product; // Store product in request for later use in updateProduct

//     const file = req.files?.image;
//     if (!file) return next(); // No image provided, move to next middleware

//     if (!imageTypes.includes(file.mimetype)) {
//         return res.status(400).json({ message: 'Provide a valid image type' });
//     }

//     const imagePath = `/${uuidv4()}-${file.name}`;

//     // 🔹 Move image only if product is valid
//     try {
//         await file.mv(`./uploads${imagePath}`);
//         req.imagePath = imagePath;
//         return next();
//     } catch (err) {
//         return res.status(500).json({ message: `Error uploading image: ${err}` });
//     }
// };

export const updateFileCheck = (req, res, next) => {

    const file = req.files?.image;
    if (!file) return next();
  
    
    if (!imageTypes.includes(file.mimetype)) return res.status(400).json({ message: 'please provide a valid image' });
    const imagePath = `/${uuidv4()}-${file.name}`;
  
    file.mv(`./uploads${imagePath}`, (err) => {
      if (err) return res.status(400).json({ message: `${err}` });
      req.imagePath = imagePath;
      return next();
    });
  
    // console.log('received:', file);
    // console.log('file type:', file?.mimetype);
  
  }