const {Schema, model} = require('mongoose');

const User = new Schema({
    nombre: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    }
})

module.exports = model('Users', User);