const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const showCart = async (req, res, next) => {
    try {
        const user = req.user;
        const mycart = user.myCart;
        var cart = [];
        for (const el of mycart) {
            const item = await productModel.findOne({_id: el.Product});
            const {Name, Price, Description} = item;
            const itemNumbers = el.ItemNumber;
            cart.push({Name, Price, Description, itemNumbers});
        }
        res.send({cart});
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404,
        }));
    }
}

module.exports = showCart;