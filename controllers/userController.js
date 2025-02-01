import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const userLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  try {

    const isExist = await User.findOne({ email: email });
    const passCom = bcrypt.compareSync(password, isExist.password);
    const token = jwt.sign({
        id: isExist._id
    }, 'secret');

    if (!isExist) {
      return res.status(401).json({
        message: 'invalid credential'
      });
    };

    
    if (!passCom) return res.status(401).json({
        message: 'invalid credential'
    });
 
    return res.status(200).json({
     message: 'user succesfully login',
     data: {
        token,
        email: isExist.email,
     }
    });
  } catch (err) {
    return res.status(400).json({
      message: `${err}`,
        });
    };
    
};

export const userRegister = async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    try {
        const isExist = await User.findOne({email: email});
        const hashPassword = bcrypt.hashSync(password, 10);
        
        if(isExist) {
            return res.status(409).json({
                status: 'error',
                message: 'User already exist',
            });
        };

        await User.create({
            username,  // username: username,
            email,     // email: email,
            password: hashPassword  // password: password,                                   
        });
        return res.status(200).json({
            status: "Success",
            message: 'Successfully Registerd',
        });
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: `${err}`,
        });
    }
    
};