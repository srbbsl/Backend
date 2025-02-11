import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";


export const userLogin = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
  try {

    const isExist = await User.findOne({ email: email });
    
    if (!isExist) {
      return res.status(401).json({
        message: 'invalid credential'
      });
    };

    const passCom = bcrypt.compareSync(password, isExist.password);
    if (!passCom) return res.status(401).json({
        message: 'invalid credential'
    });

    const token = jwt.sign({
        userId: isExist._id,
        role: isExist.role,
    }, 'secret');

    return res.status(200).json({
     message: 'user succesfully login',
     data: {
        token,
        role: isExist.role,
        userId: isExist._id,
       }
    });
  } catch (err) {
    return res.status(400).json({
      message: `${err}`,
        });
    };
    
};

export const userRegister = async (req, res) => {
    // console.log(req.body);
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

export const getUserProfile = async (req, res) => {
    // console.log(req.params);
    const { id } = req.params;

    try {
        if(!mongoose.isValidObjectId(id)) return res.status(400).json({
            message: 'please provide valid id',
        });
        const user = await User.findById(id).select('-password'); //(username email) - matra auxa (-username -password)
        if(!user) return res.status(404).json({
            message: 'user not found',
        });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        });
    };
};