const productModel = require('../../models/productModel');
const err = require('../../middleware/errorHadle');

const editProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {Price, Description} = req.body;
        const edit = await productModel.findByIdAndUpdate(id,{
            Price, 
            Description
        });
        
        if (!edit) {
            next(err({
                message: 'There Is No Product has This Id',
                stateCode: 400
            }));
        } else {
            res.send('Edit Successfully');
        }
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = editProduct;