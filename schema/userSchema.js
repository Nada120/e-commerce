const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = require('../constant/salt');
const jwt = require('jsonwebtoken');
const util = require('util');
const asyncAsign = util.promisify(jwt.sign)
const secretKey = require('../constant/secretKey');

const userSchema = mongoose.Schema({
    Email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'Email Is Required Field']
    },
    FirstName: {
        type: String,
        maxlength: [10, 'Must Be At Most 10'],
        minlength: [3, 'Must Be At Least 3'],
        required: [true, 'First Name Is Required Field']
    },
    LastName: {
        type: String,
        maxlength: [10, 'Must Be At Most 10 Number'],
        minlength: [3, 'Must Be At Least 3 Number'],
        required: [true, 'Last Name Is Required Field']
    },
    UserName: {
        type: String,
        maxlength: [15, 'Must Be At Most 15 Number'],
        minlength: [6, 'Must Be At Least 6 Number'],
        required: [true, 'User Name Is Required Field']
    },
    PhoneNumber: {
        type: Number,
        min: [11, 'Must Be 11 Number'],
        required: [true, 'Phone Number Is Required Field']
    },
    Address: {
        type: String,
        maxlength: [15, 'Must Be At Most 15 Number'],
        minlength: [4, 'Must Be At Least 4 Number'],
        required: [true, 'Address Is Required Field']
    },
    Password: {
        type: String,
        maxlength: [15, 'Must Be At Most 15 Number'],
        minlength: [8, 'Must Be At Least 8 Number'],
        required: [true, 'Password Is Required Field'] 
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    Cart: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
}); 

userSchema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        const hashpass = await bcrypt.hash(this.Password, salt);
        console.log(hashpass);
        this.Password = hashpass;
    }  next();
});

userSchema.methods.generateToken = function () {
    const token = asyncAsign({
        id: this.id,
        FirstName: this.FirstName,
        LastName: this.LastName,
        UserName: this.UserName,
        Email: this.Email,
        PhoneNumber: this.PhoneNumber,
        Address: this.Address,
    }, secretKey);
    return token;
}
module.exports = userSchema;