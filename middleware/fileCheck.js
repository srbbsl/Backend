import { v4 as uuidv4 } from 'uuid';


const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/svg', 'image/webp', 'image/avif'];
export const fileCheck = (req, res, next) => {
    // console.log('hello')
    const file = req.files?.image;
        if(!file) return res.status(400).json({
            message: 'image is required',
        });
    // console.log(file)
        if(!imageTypes.includes(file.mimetype)) return res.status(400).json({
            message: 'provide valid image type',
        });

    const imagePath = `/${uuidv4()}-${file.name}`;    

    file.mv(`./uploads${imagePath}`, (err) => {
        if(err) return res.status(400).json({
            message: `${err}`,    
        });
        req.imagePath = imagePath; //req object ma naya key ra value add gareko
        return next();  
    });
    
};