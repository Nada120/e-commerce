const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/authAdmin');

// call user & admin services
const register = require('../services/registeration');
const signin = require('../services/signin');

// call admin services
const getAllUsers = require('../services/adminServices/getAllUsers');


// user & admin services
router.post('/register', register);
router.post('/signin', signin);

// admin services
router.get('/', adminAuth, getAllUsers);
// router.delete('/delete/:id', adminAuth, deleteUser);

// user services
// router.patch('/edit/:id', userAuth, editUserData);
// router.post('/cart', userAuth, addToCart);
// router.get('/cart', userAuth, getAllCart);
// router.delete('/cart/delete/:id', userAuth, deleteProFromCart);

module.exports = router;