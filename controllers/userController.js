



export const userLogin = (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        message: 'Login page'
    });
};

export const userRegister = (req, res) => {
    return res.status(200).json({
        message: 'Register page'
    });
};