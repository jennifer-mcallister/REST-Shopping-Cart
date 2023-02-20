const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    articleNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    productName: {
        type: String,
        unique: true,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Cat', CatSchema, 'cats')