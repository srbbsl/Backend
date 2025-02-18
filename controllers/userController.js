import { User } from "../models/User.js";


export const loginUser = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        message: 'loginUser',
        users,
    });
};

export const registerUser = (req, res) => {
    return res.status(200).json({
        message: 'registerUser',
    });
};