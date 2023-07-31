const userModel = require('../../models/userModel');
const productModel = require('../../models/productModel');
const cartModel = require('../../models/cartModel');
const err = require('../../middleware/errorHadle');

const addToCart = async (req, res, next) => {
    try {
        var {id, ItemNumber} = req.body;
        const product = await productModel.findOne({_id: id});
        const user = req.user;
        if (product) {
            const isAdded = user.myCart.some(i => i.Product == id);
            if (!isAdded) {
                user.myCart.push({Product: product._id, ItemNumber: ItemNumber});
                await userModel.findByIdAndUpdate(
                    user.id,
                    {myCart: user.myCart
                });
                product.users.push(user._id);
                await productModel.findByIdAndUpdate(
                    {_id: id},
                    {users: product.users}
                );
                res.json('Added To Cart Successfully');
            } else {
                next(err({
                    message: 'The Product Already Added To Cart',
                    stateCode: 400
                }));
            }
        } else {
            next(err({
                message: 'There Is No Product has This Id',
                stateCode: 400
            }));
        }
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404,
        }));
    }
}

module.exports = addToCart;