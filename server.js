import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config';
import mongoose from 'mongoose';



const app = express();

app.listen(5000, () => {
    console.log('Server is lintening');
});

mongoose.connect(process.env.MONGO_URL).then((val) => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log(err);
});



app.get('/', (req, res) => {
    res.status(200).json({
        message: 'baseUrl',
    });
});

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);