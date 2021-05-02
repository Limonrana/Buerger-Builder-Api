/* eslint-disable comma-dangle */
const { Schema, model } = require('mongoose');
const joi = require('joi');

const orderSchema = Schema(
    {
        userId: Schema.Types.ObjectId,
        ingredients: [{ type: { type: String }, amount: Number }],
        customer: {
            fname: {
                type: String,
                required: true,
            },
            lname: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            paymentType: {
                type: String,
                required: true,
            },
        },
        price: Number,
    },
    { timestamps: true }
);

// Order Shipping Address and Customer Data Validation
const validatedOrderForm = (orderForm) => {
    const schema = joi.object({
        // eslint-disable-next-line newline-per-chained-call
        userId: joi.required(),
        ingredients: joi
            .array()
            .items({ type: joi.string().required(), amount: joi.number().required() })
            .required()
            .min(1),
        customer: joi
            .object()
            .keys({
                fname: joi.string().required(),
                lname: joi.string().required(),
                phone: joi.string().required(),
                email: joi.string().required().email(),
                address: joi.string().required(),
                paymentType: joi.string().required(),
            })
            .min(6)
            .max(6)
            .required(),
        price: joi.number().required(),
    });
    return schema.validate(orderForm);
};

module.exports = { Order: model('Order', orderSchema), validatedOrderForm };
