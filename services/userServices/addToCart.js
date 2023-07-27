const userModel = require('../../models/userModel');
const productModel = require('../../models/productModel');
const cartModel = require('../../models/cartModel'); 
const err = require('../../middleware/errorHadle');

const addToCart = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productModel.findOne({_id: id});
        const user = req.user;

        if (product) {
            const cart = await userModel.findOne({_id: user.id});
            const isAdded = cart.myCart.some(el => el == id);

            if (!isAdded) {
                
                await cartModel.create({Cart: product});
        
                user.myCart.push(product._id);
            
                console.log('my Cart is : ', user.myCart)
                await userModel.findByIdAndUpdate(
                    user.id,
                    {myCart: user.myCart}
                );

                product.users.push(user._id);
                await productModel.findByIdAndUpdate(
                    {_id: id},
                    {users: product.users}
                );

                res.json('Added To Cart Successfully');
            } else {
                next(err({
                    message: 'The Product Was Added Already',
                    stateCode: 401
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