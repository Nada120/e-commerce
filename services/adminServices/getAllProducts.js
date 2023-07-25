const productModel = require('../../model/productModel');
const err = require('../../middleware/errorHadle');

const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json({allProducts});
    
    } catch (e) {

        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = getAllProducts;