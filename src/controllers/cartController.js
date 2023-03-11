const Cart = require('../models/Cart');
const Cat = require('../models/Cat');
const { NotFoundError } = require('../utils/error');

exports.getCartById = async (req, res, next) => {
    try {
        const cartId = req.params.cartId;
        const cart = await Cart.findById(cartId);
        if(!cart) throw new NotFoundError('That shopping cart does not exist');
        return res.status(200).json(cart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: error.message,
        });
    }
    
}

exports.createCart = async (req, res, next) => {
    try {
        await Cart.deleteMany()
        const newCart = await Cart.create({
            totalPrice: 0,
            quantity: 0,
            productsInShoppingCart: [],
        });
        return res.setHeader('Location', `/api/v1/mycats/carts/${newCart._id.toString()}`).status(201).json(newCart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: error.message,
        });
    }


}

exports.addCatToCart = async (req, res, next) => {
    try {

        const cartId = req.params.cartId;
        const cart = await Cart.findById(cartId);
        if(!cart) throw new NotFoundError('That cart does not exist');
    
        const catId = req.body.catId;
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
        return res.status(201).json(updateCart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: error.message,
        });
    }
   
}

exports.deleteCart = async (req, res, next) => {
    try {

        const cartId = req.params.cartId;
        const deleteCart = await Cart.findById(cartId);
        if(!deleteCart) throw new NotFoundError('That shopping cart does not exist');
        await deleteCart.delete();
        return res.sendStatus(204);

    } catch (error) {

        console.error(error);
        return res.status(500).json({
          message: error.message,
        });
    }
}

exports.removeCatInCart = async (req, res, next) => {
    try {

    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId);
    if(!cart) throw new NotFoundError('That cart does not exist');

    const catId = req.body.catId;
    const cat = await Cat.findById(catId);
    if(!cat) throw new NotFoundError('That cat does not exist');

    const cartInventory = cart.productsInShoppingCart;
    const foundCatIndex = cartInventory.findIndex((cat) => cat._id == catId);

    const foundCat = cartInventory.find((cat) => cat._id == catId);
    if(!foundCat) throw new NotFoundError('That cat is not in shoppingcart');
    if(foundCat && (foundCat.productQuantity >= 2)) {
        foundCat.productQuantity = foundCat.productQuantity - 1;
    } else {
        cartInventory.splice(foundCatIndex, 1);
    }

    if(cart.quantity >= 1){
        cart.totalPrice = cart.totalPrice - cat.productPrice;
        cart.quantity = cart.quantity - 1;
    }

    const updateCart = await cart.save();
    return res.status(202).json(updateCart);

    } catch (error) {

        console.error(error);
        return res.status(500).json({
          message: error.message,
        });
    }   
}


