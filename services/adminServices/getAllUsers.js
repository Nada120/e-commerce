const userModel = require('../../models/userModel');
const err = require('../../middleware/errorHadle');


const getAllUsers = async (req, res, next) => {
    try {
        const usersData = await userModel.find({isAdmin: false});
        res.send(usersData);
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = getAllUsers;