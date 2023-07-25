const userModel = require('../model/userModel');

const signin = (req, res, next) => {
    try {
        const {UserName, Password} = req.body;
        // TODO ADD ECRPTIO
        const findUser = userModel.find({UserName, Password});
        // return Token
    } catch (e) {
        next(e);
    }
}
module.exports = signin;
