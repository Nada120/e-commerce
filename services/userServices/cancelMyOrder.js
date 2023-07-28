const userModel = require('../../models/userModel');
const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const cancelMyOrder = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = req.user;
        const idCancel = user.myCart.find(item => item == id);
        if (!idCancel) {
            next(err({
                message: 'There Is No product has This Id',
                stateCode: 400
            }));
        } else {
            const dateNow = new Date().getTime();
            console.log(dateNow);
            let canCancel = false;
            let newVerify = [];
            user.Verify.forEach(el => {
                if (el.idPro == id && el.TimeCancel > dateNow) {
                    canCancel = true;
                } else {
                    newVerify.push(el);
                }
            });
            if (canCancel) {
                const filterProducts = user.myCart.filter(item => item != id);
                await userModel.findByIdAndUpdate(
                    {_id: user.id},
                    {myCart: filterProducts,
                    Verify: newVerify}
                );
                const product = await productModel.findOne({_id: id});
                const users = product.users.filter(item => item != user.id);
                await productModel.findByIdAndUpdate(
                    id,
                    {users: users}
                );
                res.send('Delete Successfully');
            } else {
                next(err({
                    message: 'You Can Not Cancel Your Order The Time Out',
                    stateCode: 400
                }));
            }
        }
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = cancelMyOrder;