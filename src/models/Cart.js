const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat",
      },
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

const CartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    productsInShoppingCart: [CatSchema],
});



module.exports = mongoose.model('Cart', CartSchema);