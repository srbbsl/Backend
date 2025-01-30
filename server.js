import express from "express";
import productRoutes from './routes/productRoutes.js';

const app = express();

app.get('/', (req, res) => {
    console.log(req.query);
    return res.status(200).json({ message: 'welcome' })
});

app.use('/api/products', productRoutes);

app.listen(5000, () => {
    console.log('server is running')
});