const userModel = require('../../models/userModel');
const err = require('../../middleware/errorHadle');

const showCart = async (req, res, next) => {
    try {
        const user = req.user;
        const allCart = await user.populate({
            path: "Cart", 
            model: "ProductData", 
            select: ["Name", "Price", "Description"]
        });
        
        res.json(allCart.Cart);
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404,
        }));
    }
}

module.exports = showCart;