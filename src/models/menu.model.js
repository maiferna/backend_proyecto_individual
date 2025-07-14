const { Schema, model } = require('mongoose');

const Menu = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipes'
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