import { User } from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExist = await User.findOne({ email: email })
        if (!isExist) return res.status(401).json({
            message: 'user does not exist',
        });

        const checkPassword = bcrypt.compareSync(password, isExist.password);
        if (!checkPassword) return res.status(401).json({
            message: 'wrong password',
        });

        const token = jwt.sign({
            userId: isExist._id,
            role: isExist.role,
        }, process.env.SECRET);

        return res.status(200).json({
                message: 'login successfully',
                data: {
                    token,
                    role: isExist.role,
                }
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