const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        require: true,
    },
    productsInShoppingCart: [{
        quantity: {
            type: Number,
            require: true,
        },
        productInCart: {
            catId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cat",
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    }]
});

module.exports = mongoose.model('Cart', CartSchema);