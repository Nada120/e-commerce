const productModel = require('../../models/productModel');

const addProduct = async (req, res, next) => {
    try {
        const {Name, Price, Description} = req.body;
        await productModel.create({Name, Price, Description});
        res.status(200).send('Added Succussefully');
    
    } catch (e) {
        
        const message = e.message.substring(30).split(',');
        res.status(404).json(message);
    }
}

module.exports = addProduct;