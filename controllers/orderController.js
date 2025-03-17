import { Order } from "../model/Order.js";


export const getAllOrder = async (req, res) => {

};

export const getorderById = async (req, res) => {
    
};

export const getOrderByUser = async (req, res) => {

};

export const createOrder = async (req, res) => {
    const { products, totalAmount } = req.body;
    try {
        await Order.create({
            userId: req.userId,
            products,
            totalAmount,
        });

        return res.status(201).json({ message: 'order created successfully '});
    } catch (err) {
        return res.status(400).json({ message: `${err}`});
    }
};