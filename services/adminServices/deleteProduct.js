const productModel = require('../../models/productModel');
const cartModel = require('../../models/cartModel');
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
                const cart = el.myCart.filter(l => l != id);
            
                await userModel.findByIdAndUpdate(
                    {_id: el._id},
                    {myCart: cart}
                );
             
            }
            
            await cartModel.deleteMany({Cart: id});
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