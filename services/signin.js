const userModel = require('../model/userModel');
const err = require('../middleware/errorHadle');
const bcrypt = require('bcrypt');

const signin = async (req, res, next) => {
    try {
        const {UserName, Password} = req.body;
        const findUser = await userModel.findOne({UserName});
        if (!findUser) {
            next(err({
                stateCode: 400,
                message: 'The UserName Not found'
            }));
        }
        
        const comPassword = await bcrypt.compare(Password, findUser.Password);
        if (!comPassword) {
            next(err({
                stateCode: 400,
                message: 'The Password is invalid'
            }));
        }

        const token = await findUser.generateToken();
        res.status(200).json({token});
    } catch (e) {
        const message = e.message.substring(28).split(',');
        next(err({
            stateCode: 400,
            message: res.json(message)
        }));
    }
}
module.exports = signin;
