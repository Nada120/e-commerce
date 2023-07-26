const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');

const userModel = mongoose.model('UserData', userSchema);

module.exports = userModel;