const productModel = require('../../models/productModel');
const userModel = require('../../models/userModel');
const err = require('../../middleware/errorHadle');

const deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productModel.findOne({ _id: id });
        if (!product) {
            next(err({
                message: 'There Is No Product has This Id',
                stateCode: 400
            }));
        } else {
            const users = await userModel.find({});
            for (const el of users) {
                let cart = el.myCart.filter(l => l.Product != id);
                let verify = el.Verify.filter(l => l.idPro != id);
                await userModel.findByIdAndUpdate(
                    {_id: el._id},
                    {myCart: cart,
                    Verify: verify}
                );
            }
            await productModel.findOneAndDelete({ _id: id });
            res.send('Delete Successfully');
        }
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = deleteProduct;