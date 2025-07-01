const {Schema, model} = require('mongoose');

const Menu = new Schema({
    user: {
        // user_id object id
    },
    recipe: {
        // recipe_id object id
    },
    list: [{
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