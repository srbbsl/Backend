import { User } from "../model/User.js";


export const userLogin = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        message: 'userLogin',
        users,
    });
};