import { User } from "../model/User.js";


export const userLogin = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        message: 'userLogin',
        users,
    });
};

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await User.create({
            username,
            email,
            password
        })
        return res.status(201).json({
                message: 'registered successfully',
        });
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    }
    
};