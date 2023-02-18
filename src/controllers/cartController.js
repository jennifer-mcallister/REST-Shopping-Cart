const Cart = require('../models/Cart');

exports.getCartById = async (req, res, next) => {
    return res.send("your cart");
}

exports.createCart = async (req, res, next) => {
    return res.send("new cart");
}

exports.deleteCart = async (req, res, next) => {
    return res.send("your cart is removed");
}

exports.addCatToCart = async (req, res, next) => {
    return res.send(" new cat is in your cart");
}

exports.removeCatInCart = async (req, res, next) => {
    return res.send("cat has left your cart");
}


