import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username must be given'],
        //default: user - randomly user value basxa
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    }

}, {timestamps: true});

export const User = mongoose.model('User', userSchema);