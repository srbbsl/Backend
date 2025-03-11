import jwt from 'jsonwebtoken';

export const authCheck = (req, res, next) => {
    const token = req.headers.authorization;
    const decode = jwt.decode(token, process.env.SECRET);
    if(!decode) return res.status(401).json({ message: 'Unauthorized '})
    // console.log(decode)
    req.userId = decode.userId;
    req.role = decode.role;
    next();
};

export const adminCheck = (req, res, next) => {
    if(req.role !== 'admin') return res.status(401).json({ message: 'Unauthorized-only admin can access this route'})
    next();
};