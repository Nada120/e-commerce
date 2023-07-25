const userModel = require('../model/userModel');
const err = require('../middleware/errorHadle');

const register = async (req, res, next) => {
    try {
        const userData = req.body;
        const addUser = await userModel.create(userData);
        
        // return Token
        // res.status(200).send(token);

    } catch (e) {
        const message = e.message.substring(28).split(',');
        next(err({
            stateCod: 400,
            message: res.json(message)
        }));
    }
}

module.exports = register;