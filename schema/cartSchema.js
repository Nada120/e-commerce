const { name } = require('ejs');
const mongoose = require('mongoose');

const carttSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        default: 'UserData',
    },
    Cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductData'
    }
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._id;
            delete ret.users;
        },
    }
});

module.exports = carttSchema;