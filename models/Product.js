import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title must be given'],
    },
    description: {
        type: String,
        required: [true, 'description must be given'],
    },
    price: {
        type: String,
        required: [true, 'price must be given'],
    },
    category: {
        type: String,
        enum: ['shoe', 'shirt', 'watch', 'mobile', 'laptop'],
        required: [true, 'category must be given'],
    },
    brand: {
        type: String,
        enum: ['puma', 'polo', 'rolex', 'apple', 'samsung', 'oneplus'],
        required: [true, 'category must be given'],
    },
    image: {
        type: String,
        required: [true, 'image must be given'],
    },
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);