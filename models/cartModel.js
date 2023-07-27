const mongoose = require('mongoose');
const cartSchema = require('../schema/cartSchema');

const cartModel = mongoose.model('CartData', cartSchema);

module.exports = cartModel;