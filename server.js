import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';


const app = express();

app.listen(5000, () => {
        console.log('Server is running');
    });

mongoose.connect('mongodb+srv://admin:admin@cluster0.j5rgs.mongodb.net/ecommerce').then((val) => { 
    console.log('Database connected')
}).catch((err) => {
    console.log(err);
});



app.use(express.json());

app.use('/api/users', userRoutes);