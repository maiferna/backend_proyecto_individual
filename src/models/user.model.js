const { Schema, model } = require('mongoose');

const User = new Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true
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
        ref: 'Recipe'
    }],
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }
})

module.exports = model('Users', User);