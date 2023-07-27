const userModel = require('../../models/userModel');
const err = require('../../middleware/errorHadle');

const verifyMyProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const findProduct = user.myCart.filter(item => item == id);


        if (!findProduct) {
            next(err({
                message: 'The Id Of The Product Not Found',
                stateCode: 402
            }));

        } else {
            let isVerify = false;
            user.Verify.forEach(el => {
                if (el.idPro == id) {
                    isVerify = true;
                } 
            });
            if (isVerify) {
                next(err({
                    message: "Is Verify Already!!",
                    stateCode: 401
                }));
            } else {
                user.Verify.push({
                    idPro: id,
                    TimeCancel: new Date().getTime() + (60 * 60 * 24 * 1000)
                });
                await userModel.findByIdAndUpdate(user.id, {
                    Verify: user.Verify
                });
                res.status(200).send('Verify Successfully');
            }

        }
    } catch (e) {
        next(err({
            message: e.message,
            stateCode: 404
        }));
    }
}

module.exports = verifyMyProduct;