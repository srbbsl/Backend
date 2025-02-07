import jwt from 'jsonwebtoken';

export const checkUser = (req, res, next) => {
    // console.log(req);
    // console.log(req.headers);
    const token = req.headers.authorization;
    const decode = jwt.decode(token, 'secret');
    // console.log(decode);

    if(!decode) return res.status(401).json({
        message: 'unathorized',
    });

    req.userId = decode.userId;
    req.role = decode.role;

    return next();
};

export const checkAdmin = (req, res, next) => {
    if (req.role === 'admin') {
        return next();
    } else {
        return res.status(401).json({
        message: 'unauthorized'
        });    
        
    };

    
};