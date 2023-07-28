const util = require('util');
const jwt = require('jsonwebtoken');
const verifyAuth = util.promisify(jwt.verify);
const secretKey = require('../constant/secretKey');
const userModel = require('../models/userModel');

const err = require('./errorHadle');

const userAuth = async (req, res, next) => {
    const {auth: token} = req.headers;

    if (!token) {
        next(err({
            message: 'Please Register Or Signin To Access To Our Services',
            stateCode: 404
        }));
    } else {
        const decode = await verifyAuth(token, secretKey);
        const user = await userModel.findOne({_id: decode.id});
        if (decode.isAdmin) {
            next(err({
                message: 'You Are Not Authorized, You Should Be User',
                stateCode: 402
            }));
        } else {

            req.token = token;
            req.user = user;
            next();
        }
    }
}

module.exports = userAuth;