const mongoose = require('mongoose');
const productSchema = require('../schema/productSchema');

const productModel = mongoose.model('ProductData', productSchema);

module.exports = productModel;