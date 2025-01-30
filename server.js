import express from 'express';
import productRoutes from './routes/productRoutes.js'

const app = express();

app.listen(5000, () => {
    console.log('Server is Running')
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to Backend" })
});

app.use('/api/products', productRoutes)
