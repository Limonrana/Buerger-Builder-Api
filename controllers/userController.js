const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validatedUser, validPassword } = require('../models/user');

/*
 * Signup Method
 * @params Request and Response
 */

const signup = async (req, res) => {
    const { error } = validatedUser(req.body);
    if (error) {
        return res.status(400).json({
            type: 'error',
            message: error.details[0].message,
        });
    }

    // Password Validation with complexityOptions
    const pass = validPassword(req.body.password);
    if (pass.error) {
        return res.status(400).json({
            type: 'error',
            message: 'Password must be at least 1 lowerCase, upperCase, numeric, symbol!',
        });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            type: 'error',
            message: 'Email already exist!',
        });
    }

    user = new User(_.pick(req.body, ['email', 'password']));
    // Password bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const token = user.generateJWT();
    const result = await user.save();

    return res.status(201).json({
        type: 'success',
        token,
        user: _.pick(result, ['_id', 'email']),
    });
};

/*
 * Login Method
 * @params Request and Response
 */

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(401).json({
            type: 'error',
            message: 'Autheticaion failed!',
        });
    }

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) {
        return res.status(401).json({
            type: 'error',
            message: 'Autheticaion failed!',
        });
    }

    const token = user.generateJWT();
    return res.status(200).json({
        type: 'success',
        token,
        user: _.pick(user, ['_id', 'email']),
    });
};

module.exports = { signup, login };
