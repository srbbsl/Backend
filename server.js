import express from "express";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:admin@cluster0.j5rgs.mongodb.net/shop2').then((val) => {
    app.listen(5000, () => {
        console.log('Server is running');
    });
}).catch((err) => {
    console.log(err)
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'First route',
    });
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);
