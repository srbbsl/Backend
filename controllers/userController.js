



export const userLogin = (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        message: 'Login page',
    });
};

export const userRegister = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
   try {
        await User.create({
            username,
            email,
            password,
        });
        return res.status(200).json({
            message: 'success',
        });
   } catch (err) {
        return res.status(400).json({
            message: `${err}`,
        })
   }
};