const express = require('express');
const auth = require('../middlewares/auth');
const { signup, login } = require('../controllers/userController');
const { createOrder, getOrder } = require('../controllers/orderController');

const router = express.Router();
router.post('/user/signup', signup).post('/user/login', login);
router.post('/orders', auth, createOrder).get('/orders', auth, getOrder);

module.exports = router;
