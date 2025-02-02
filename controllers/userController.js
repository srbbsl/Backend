import { User } from "../models/User.js";
import bcrypt from 'bcrypt';




export const userLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    
    try {
        const isUserExist = await User.findOne({ email:email });
        const passCompare = bcrypt.compareSync(password, isUserExist.password);
        
            if(!isUserExist) {
                return res.status(409).json({
                    message: 'invalid credentials'
                });
            };
            
            if(!passCompare) return res.status(401).json({
                message: 'invalid credential'
            });

            return res.status(200).json({
                message: 'user successfully login'
            });
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    };
    
   
};

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    const hashpass = bcrypt.hashSync(password, 10);

    try {
        const isUserExist = await User.findOne({email})
        if(isUserExist) {
            return res.status(409).json({
                message: 'user exist'
            })
        } 
        //     $or: [{email: email}, { username: username }]
        // });
        
        //     if(isUserExist.email === email && isUserExist.username === username) {
        //         return res.status(409).json({
        //             message: 'Username and Email already exist',
        //         });
        //     } else if(isUserExist.email === email) {
        //         return res.status(409).json({
        //             message: 'Email already exist',
        //         });
        //     } else if(isUserExist.username === username) {
        //         return res.status(409).json({
        //             message: 'Username already exist',
        //         });
        //     }
         

        await User.create({
            username,
            email,
            password: hashpass
        });
        return res.status(200).json({
            message: 'Registerd Successfully',
        });
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    };
};