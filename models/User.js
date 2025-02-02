import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be given'] 
    },
    email: {
        type: String,
        unique: [true, 'email must be unique'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);