const userModel = require('../../model/userModel');
const err = require('../../middleware/errorHadle');


const getAllUsers = async (req, res, next) => {
    try {
        const usersData = await userModel.find({});
        res.send(usersData);
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = getAllUsers;