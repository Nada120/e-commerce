const userModel = require('../model/userModel');

const register = async (req, res, next) => {
    const {
        FirstName,
        LastName,
        UserName,
        Email,
        Password,
        PhoneNumber,
        Address,
        isAdmin
    } = req.body;
    
    try {
        const addUser = await userModel.create({
            FirstName,
            LastName,
            UserName,
            Email,
            Password,
            PhoneNumber,
            Address,
            isAdmin
        });
        
        const token = await addUser.generateToken();
        res.status(200).json({token});
    } catch (e) {

        const message = e.message.substring(28).split(',');
        res.status(404).json(message);
    }
}

module.exports = register;