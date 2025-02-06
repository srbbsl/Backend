import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

const app = express();



mongoose.connect('mongodb+srv://admin:admin@cluster0.j5rgs.mongodb.net/Shop').then((val) => {
    console.log('Database connected successfully');
    console.log('MongoDB Connection State:', mongoose.connection.readyState);
    app.listen(5000, () => {
    console.log('Server is running');
    });
}).catch((err) => {
    console.log(err)
});

app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  }));

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to backend'
    });
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);