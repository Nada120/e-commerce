const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const delProduct = await productModel.findOneAndDelete({ _id: id });

        if (!delProduct) {
            next(err({
                message: 'There Is No Product has This Id',
                stateCode: 400
            }));
        } else {
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