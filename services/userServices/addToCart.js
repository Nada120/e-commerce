const userModel = require('../../models/userModel');
const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const addToCart = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productModel.findOne({_id: id});
        const user = req.user;
        
        if (product) {
            
            user.Cart.push(product._id);
            await userModel.findByIdAndUpdate(
                user._id,
                {Cart: user.Cart}
            );

            product.users.push(user._id);
            await productModel.findByIdAndUpdate(
                {_id: id},
                {users: product.users}
            );

            res.json('Added To Cart Successfully');
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