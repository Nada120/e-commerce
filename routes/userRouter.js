const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/authAdmin');
const userAuth = require('../middleware/authUser');

// call user & admin services
const register = require('../services/registeration');
const signin = require('../services/signin');

// call admin services
const getAllUsers = require('../services/adminServices/getAllUsers');
const deleteUser = require('../services/adminServices/deleteUser');

// call user services
const addToCart = require('../services/userServices/addToCart');
const showCart = require('../services/userServices/showCart');
const cancelMyOrder = require('../services/userServices/cancelMyOrder');
const verifyMyOrder = require('../services/userServices/verifyMyProduct');

// user & admin services
router.post('/register', register);
router.post('/signin', signin);

// show signin html page
router.get('/signin', (req, res) => {
    res.render("signin")
});

// show register html page
router.get('/register', (req, res) => {
    res.render("register");
});

// admin services
router.get('/', adminAuth, getAllUsers);
router.delete('/delete/:id', adminAuth, deleteUser);

// user services
router.post('/cart/add', userAuth, addToCart);
router.get('/cart', userAuth, showCart);
router.post('/cart/verify/', userAuth, verifyMyOrder);
router.post('/cart/cancel/', userAuth, cancelMyOrder);

module.exports = router;