const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const showCart = async (req, res, next) => {
    try {
        const user = req.user;
        const allProducts = user.myCart;
        var cart = [];
        
        for (const el of allProducts) {
            const item = await productModel.findOne({_id: el});
            const {Name, Price, Description} = item;
            cart.push({Name, Price, Description});
        }
        
        res.send(cart);
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404,
        }));
    }
}

module.exports = showCart;