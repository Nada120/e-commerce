const userModel = require('../../models/userModel');
const err = require('../../middleware/errorHadle');

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userModel.findOne({ _id: id });
        
        if(!user) {
            next(err({
                message: 'There Is No User has This Id',
                stateCode: 400
            }));
        
        } else {
            await userModel.findOneAndDelete({ _id: id });
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