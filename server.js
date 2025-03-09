import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';


const app = express();

app.listen(5000, () => {
    console.log('Server is running'); 
    });

mongoose.connect(process.env.MONGO_URL).then((val) => {
    console.log('Database connected successfully');   
}).catch((err) => {
    console.log(err);
});

app.use(cors({
    origin: ['http://localhost:3000'],
}));

app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
}));

app.use(express.static('uploads'));



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

