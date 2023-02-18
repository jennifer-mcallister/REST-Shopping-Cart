const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        require: true,
    },
    productsInShoppingCart: [{
        catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cat",
        },
    }]
});

module.exports = mongoose.model('Cart', CartSchema);