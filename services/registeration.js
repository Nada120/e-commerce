const userModel = require('../models/userModel');
const err = require('../middleware/errorHadle');

const register = async (req, res, next) => {
    const {
        FirstName,
        LastName,
        UserName,
        Email,
        Password,
        PhoneNumber,
        Address,
        isAdmin
    } = req.body;
    try {
        const isfound = await userModel.findOne({UserName: req.body.UserName});
        if (!isfound) {
            const addUser = await userModel.create({
                FirstName,
                LastName,
                UserName,
                Email,
                Password,
                PhoneNumber,
                Address,
                isAdmin
            });
            const token = await addUser.generateToken();
            res.status(200).json({token});
        } else {
            next(err({
                stateCode: 400,
                message: 'The UserName already Exist'
            }));
        }
    } catch (e) {

        const message = e.message.substring(28).split(',');
        res.status(404).json(message);
    }
}

module.exports = register;