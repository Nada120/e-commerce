const userModel = require('../models/userModel');
const err = require('../middleware/errorHadle');
const bcrypt = require('bcrypt');

const signin = async (req, res, next) => {
    try {
        const {Email, Password} = req.body;
        const findUser = await userModel.findOne({Email});
        if (!findUser) {
            next(err({
                stateCode: 400,
                message: 'The Email Not found'
            }));
        } else {
            const comPassword = await bcrypt.compare(Password, findUser.Password);
            if (comPassword) {
                const token = await findUser.generateToken();
                res.json({token});
            } else {
                next(err({
                    stateCode: 400,
                    message: 'The Password is invalid'
                }));
            }
        }
    } catch (e) {
        
        const message = e.message.split(',');
        res.status(404).json(message);
    }
}
module.exports = signin;
