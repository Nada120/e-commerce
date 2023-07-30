const userModel = require('../../models/userModel');
const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userModel.findOne({ _id: id });
        const products = await productModel.find({});
        if(!user) {
            next(err({
                message: 'There Is No User has This Id',
                stateCode: 400
            }));
        } else {
            await userModel.findOneAndDelete({ _id: id });
            for (const el of products) {
                const users = el.users.filter(l => l != id);
                await productModel.findByIdAndUpdate(
                    {_id: el._id},
                    {users: users}
                );
                console.log(users);
            }
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