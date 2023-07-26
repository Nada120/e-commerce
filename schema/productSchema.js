const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Name: {
        type: String,
        maxlength: [15, 'Must Be At Most 15'],
        minlength: [2, 'Must Be At Least 2'],
        required: [true, 'Name of Product Is Required Field']
    },
    Price: {
        type: Number,
        required: [true, 'Price of Product Is Required Field']
    },
    Description: {
        type: String,
        maxlength: [100, 'Must Be At Most 100'],
        minlength: [10, 'Must Be At Least 10'],
        required: [true, 'Description of Product Is Required Field']
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserData'
    }],   
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            delete ret.users;           
        },
    }
});

module.exports = productSchema;