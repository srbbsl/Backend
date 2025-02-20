import { User } from "../model/User.js";
import bcrypt from 'bcrypt';


export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        return res.status(200).json({
                message: 'login successfully',
            });
    } catch (err) {
        res.status(400).json({
            message: `${err}`,
        });
    }
    
    
};

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const isExist = await User.findOne({ email: email })
        if (isExist) return res.status(409).json({
            message: 'user already exist',
        });

        const hashPassword = bcrypt.hashSync(password, 10);
        await User.create({
            username,
            email,
            password: hashPassword,
        });
        return res.status(201).json({
            message: 'registered successfully',
        });
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    }
    
};