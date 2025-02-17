import express from 'express';
import { products } from './products.js';

const app = express();

app.listen(5000, () => {
    console.log('listening');
});

app.get('/', (req, res) => {
    const { price } = req.query;
    const getPrice = products.filter((product) => product.price >= price)
    return res.status(200).json(getPrice)
    
})