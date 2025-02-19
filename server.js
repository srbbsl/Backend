import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.listen(5000, () => {
    console.log('Server is lintening');
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'baseUrl',
    });
});

app.use('/api', productRoutes);
app.use('/api', userRoutes);