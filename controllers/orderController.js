const { Order, validatedOrderForm } = require('../models/order');

/*
 * Order Create Method
 * @params Request and Response
 */

const createOrder = async (req, res) => {
    const { error } = validatedOrderForm(req.body);
    if (error) {
        return res.status(400).json({
            type: 'error',
            message: error.details[0].message,
        });
    }

    const order = new Order(req.body);
    try {
        await order.save();
        return res.status(201).json({
            type: 'success',
            order,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'error',
            message: 'There was an server side error!',
        });
    }
};

const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json({
            type: 'success',
            orders,
        });
    } catch (err) {
        return res.status(500).json({
            type: 'error',
            message: 'There was an server side error!',
        });
    }
};

module.exports = { createOrder, getOrder };
