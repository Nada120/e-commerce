const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/authAdmin');
const addProduct = require('../services/adminServices/addProduct');
const err = require('../middleware/errorHadle');

// admin services
router.post('/', adminAuth, addProduct);
// router.get('/', adminAuth, getProduct);
// router.delete('/delete/:id', adminAuth, deleteProduct);
// router.patch('/edit/:id', adminAuth, editProduct);

module.exports = router;