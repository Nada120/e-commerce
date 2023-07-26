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


// user & admin services
router.post('/register', register);
router.post('/signin', signin);

// admin services
router.get('/', adminAuth, getAllUsers);
router.delete('/delete/:id', adminAuth, deleteUser);

// user services
router.get('/cart/:id', userAuth, addToCart);
router.get('/cart', userAuth, showCart);
// router.post('/cart/verify', userAuth, verifyMyOrder);
// router.delete('/cart/cancel/:id', userAuth, cancelMyOrder);

module.exports = router;