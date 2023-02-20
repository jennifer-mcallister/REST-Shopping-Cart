const Cart = require('../models/Cart');
const Cat = require('../models/Cat');
const { NotFoundError } = require('../utils/error');

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
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    if(!cart) throw new NotFoundError('That cart does not exist');

    const catId = req.body._id;
    const cat = await Cat.findById(catId);
    if(!cat) throw new NotFoundError('That cat does not exist');

    const cartInventory = cart.productsInShoppingCart;

    const newCat =  {
        articleNumber: cat.articleNumber,
        productName: cat.productName,
        productPrice: cat.productPrice,
        productQuantity: 1,
        _id: cat._id,
    };

    const foundCat = cartInventory.find((cat) => cat._id == catId);
    if(foundCat) {
        foundCat.productQuantity += 1;
    } else {
        cartInventory.push(newCat);
    }

    cart.totalPrice += newCat.productPrice;
    cart.quantity += 1;

    const updateCart = await cart.save();
    return res.json(updateCart);
}

exports.deleteCart = async (req, res, next) => {
    const cartId = req.params.id;
    const deleteCart = await Cart.findById(cartId);
    if(!deleteCart) throw new NotFoundError('That shopping cart does not exist');
    await deleteCart.delete();
    return res.sendStatus(204);
}

exports.removeCatInCart = async (req, res, next) => {
    console.log("trying to delete cat")
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    if(!cart) throw new NotFoundError('That cart does not exist');
    console.log(cart.totalPrice)

    const catId = req.body._id;
    console.log(catId)
    const cat = await Cat.findById(catId);
    if(!cat) throw new NotFoundError('That cat does not exist');

    const cartInventory = cart.productsInShoppingCart;
    console.log(cartInventory)

    const foundCat = cartInventory.findIndex((cat) => cat._id == catId);
    console.log(foundCat)
    console.log(cat)

    cartInventory.splice(foundCat, 1);


    cart.totalPrice = cart.totalPrice - cat.productPrice;
    cart.quantity = cart.quantity - 1;

    const updateCart = await cart.save();
    return res.json(updateCart);
}


