import { User } from "../models/User.js";


export const userLogin = (req, res) => {
    return res.status(200).json({ message: 'Login'})
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

        await User.create({
            username,
            email,
            password,
        })
        return res.status(200).json({ message: 'registered successfully'});
    } catch (err) {
        return res.status(400).json({ message: `${err}`});
    }
};