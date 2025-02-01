import { User } from "../models/User.js";



export const userLogin = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    return res.status(200).json({
        message: 'login page'
    });
};

export const userRegister = async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    try {
        const isExist = await User.findOne({
            email: email
        });
        
        if(isExist) {
            return res.status(409).json({
                status: 'error',
                message: 'User already exist',
            });
        };

        await User.create({
            username,  // username: username,
            email,     // email: email,
            password,  // password: password,                                   
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