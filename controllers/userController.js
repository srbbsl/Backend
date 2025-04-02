import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const isExist = await User.findOne({ email: email });
        if (!isExist)
            return res.status(404).json({message: 'user not found'});
        
        const passwordCompare = bcrypt.compareSync(password, isExist.password)
        if (!passwordCompare)
            return res.status(401).json({message: 'invalid password'})

        const token = jwt.sign({
            userId: isExist._id,
            role: isExist.role,
        }, 'secret')

        return res.status(200).json({ 
            message: 'login successfully',
            data: {
                token,
                userId: isExist._id,
                role: isExist.role,
            }
        });
    } catch (err) {
        return res.status(400).json({message: `${err}`})
    }
};

export const userRegister = async (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body;

    try {
        const isExist = await User.findOne({ email: email }); //email field ma user le pathayeko email xa xaina check garxa
        // console.log(isExist)

        if(isExist) {
            return res.status(409).json({ message: 'user already exist' });
        }
        
        const hashPassword = bcrypt.hashSync(password, 10);
        
        await User.create({
            username: username,
            email: email,
            password: hashPassword,
        })
        return res.status(200).json({ message: 'registered successfully'});
    } catch (err) {
        return res.status(400).json({ message: `${err}`});
    }
};