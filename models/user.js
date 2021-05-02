/* eslint-disable comma-dangle */
const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 32,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024,
        },
    },
    { timestamps: true }
);

const validatedUser = (user) => {
    const schema = joi.object({
        // eslint-disable-next-line newline-per-chained-call
        email: joi.string().min(10).max(32).required().email(),
        password: joi.string().required().min(6).max(16),
    });
    return schema.validate(user);
};

const validPassword = (password) => {
    const complexityOptions = {
        min: 6,
        max: 16,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
    };
    return passwordComplexity(complexityOptions).validate(password);
};

userSchema.methods = {
    generateJWT() {
        const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: '3h',
        });
        return token;
    },
};
module.exports = { User: model('User', userSchema), validPassword, validatedUser };
