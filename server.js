import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.listen(5000, () => {
    console.log('Server is running');
});

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to backend'
    });
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);