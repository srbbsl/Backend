import { v4 as uuidv4 } from 'uuid';

const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg', 'image/webp', 'image/avif'];
export const fileCheck = (req, res, next) => {
    
    const file = req.files?.image;
    if (!file) return res.status(400).json({
        message: 'image is required',
    });

    if (!imageTypes.includes(file.mimetype)) return res.status(400).json({
        message: 'image type is invalid',
    });
    
    file.mv();
    return next();
}