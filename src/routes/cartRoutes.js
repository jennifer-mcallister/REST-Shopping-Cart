const express = require('express');
const router = express.Router();

const { 
    getCartById,
    createCart,
    deleteCart,
    addCatToCart,
    removeCatInCart,
} = require('../controllers/cartController');

router.get('/:cartId', getCartById);
router.post('/', createCart);
router.put('/:cartId', addCatToCart);
router.post('/:cartId', removeCatInCart)
router.delete('/:cartId', deleteCart);

module.exports = router;