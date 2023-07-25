const util = require('util');
const jwt = require('jsonwebtoken');
const verifyAuth = util.promisify(jwt.verify);
const secretKey = require('../constant/secretKey');
const err = require('./errorHadle');

const adminAuth = async (req, res, next) => {
    const {auth: token} = req.headers;

    if (!token) {
        next(err({
            message: 'Please Register Or Signin To Access To Our Services',
            stateCode: 404
        }));
    } else {
        const decode = await verifyAuth(token, secretKey);
        if (!decode.isAdmin) {
            next(err({
                message: 'You Are Not Authorized, You Should Be Admin',
                stateCode: 402
            }));
        } else {
            next();
        }
    }
}

module.exports = adminAuth;