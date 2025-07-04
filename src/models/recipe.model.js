
const { Schema, model } = require('mongoose');

const Recipe = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        name: {
            type: String
        },
        quantity: {
            type: String
        }
    }],
    image: {
        type: String
    },
    difficulty: {
        type: String,
        enum: ['facil', 'media', 'dificil']
    },
    time: {
        type: String
    },
    category: [{
        type: String
    }],
    intolerance: [{
        type: String
    }],
    steps: [{
        type: String
    }]
})

module.exports = model('Recipes', Recipe);