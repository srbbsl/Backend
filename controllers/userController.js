


export const userLogin = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    return res.status(200).json({
        message: 'login page'
    });
};

export const userRegister = (req, res) => {
    return res.status(200).json({
        message: 'register page'
    })
}