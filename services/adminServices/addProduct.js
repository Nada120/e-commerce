const productModel = require('../../model/productModel');
const err = require('../../middleware/errorHadle');

const addProduct = async (req, res, next) => {
    try {
        const {Name, Price, Description} = req.body;
        await productModel.create({Name, Price, Description});
        res.status(200).send('Added Succussefully');
    
    } catch (e) {
        
        const message = e.message.substring(30).split(',');
        next(err({
            message: res.json(message),
            stateCode: 404
        }));
    }
}

module.exports = addProduct;