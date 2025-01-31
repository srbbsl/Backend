import express from 'express';
import productRoutes from './routes/productRoutes.js'

const app = express();

app.listen(5000, () => {
    console.log("Server Connected");
});

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        message: 'Success',
    })
});

app.use('/api/products', productRoutes)