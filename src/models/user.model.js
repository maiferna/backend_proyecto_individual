const { Schema, model } = require('mongoose');

const User = new Schema({
    _id: {
        type: String
    },
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
    // Cada elemento en favorites es un ObjectId que apunta a un documento de la colección Recipe.
    // ObjectId: tipo de dato que actúa como identificador único para cada documento en una colección
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
    }],
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menus'
    }
})

module.exports = model('Users', User);