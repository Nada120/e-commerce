const userModel = require('../../model/userModel');
const err = require('../../middleware/errorHadle');

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const delUser = await userModel.findOneAndDelete({ _id: id });
        if(!delUser) {
            next(err({
                message: 'There Is No User has This Id',
                stateCode: 400
            }));
        } else {
            res.send('Delete Successfully');
        }
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = deleteUser;