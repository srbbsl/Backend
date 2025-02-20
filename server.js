import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';



const app = express();



mongoose.connect(process.env.MONGO_URL).then((val) => {
    app.listen(5000, () => {
    console.log('Server is listening');
    console.log('Database connected successfully');
    });
}).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
}));
app.use(express.static('uploads')); //yesle kam garena image download hunxa sidhai

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'baseUrl',
    });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
