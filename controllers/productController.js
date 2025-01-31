

export const getAllProducts = (req, res) => {
    return res.status(200).json({
        status:"Success",
        message: "Products"
    });
}