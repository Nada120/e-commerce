const userModel = require('../model/userModel');

const register = (req, res, next) => {
    try {
        const userData = req.body;
        // TODO ADD ECRPTIO
        const addUser = userModel.create(userData);
        // return Token
    } catch (e) {
        next(e);
    }
}

module.exports = register;