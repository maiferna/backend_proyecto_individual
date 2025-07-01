const {Schema, model} = require('mongoose');

const User = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    intolerance: [{
        type: String
    }],
    favorites: [{
        //Recipes id objectId
    }],
    menu: {
        // Menu id objectId
    }
})

module.exports = model('Users', User);