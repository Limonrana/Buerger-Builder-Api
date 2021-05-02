const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({
            type: 'failed',
            message: 'Authentication failure!',
        });
    }
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        return res.status(400).json({
            type: 'failed',
            message: 'Authentication failure!',
        });
    }
};

module.exports = auth;
