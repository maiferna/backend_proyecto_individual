const { Schema, model } = require('mongoose');

const Menu = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    shoplist: [{
        name: {
            type: String
        },
        checked: {
            type: Boolean,
            default: false
        }
    }]
})

module.exports = model('Menus', Menu);