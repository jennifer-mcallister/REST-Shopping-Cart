const Cart = require('../models/Cart');

exports.getCartById = async (req, res, next) => {
    console.log("trying to get shopping cart by id");
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    if(!cart) throw new NotFoundError('That shopping cart does not exist');
    console.log(cart);
    return res.json(cart);
}

exports.createCart = async (req, res, next) => {
    const newCart = await Cart.create({
        totalPrice: 0,
        quantity: 0,
        productsInShoppingCart: [],
    });
    console.log(newCart);
    return res.setHeader('Location', `/api/mycats/carts/${newCart._id.toString()}`).json(newCart);
}

exports.addCatToCart = async (req, res, next) => {
    return res.send(" new cat is in your cart");
}

exports.deleteCart = async (req, res, next) => {
    return res.send("your cart is removed");
}

exports.removeCatInCart = async (req, res, next) => {
    return res.send("cat has left your cart");
}


