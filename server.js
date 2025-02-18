import express from 'express';
import productRoutes from './routes/productRoutes.js';
import loginRoutes from './routes/authRoutes.js';
import registerRoutes from './routes/authRoutes.js';
import 'dotenv/config'; 
import mongoose from 'mongoose';


const app = express();

mongoose.connect(process.env.MONGO_URL).then((val) => {
        app.listen(5000, () => {
        console.log('Database connect susscessfully');
    });
    }).catch((err) => {
    console.log(err)
});




app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'localhost 5000'
    });
});

app.use('/api/products', productRoutes);

app.use('/api', loginRoutes);

app.use('/api', registerRoutes);