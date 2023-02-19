const express = require('express');
const router = express.Router();

const { 
    getCartById,
    createCart,
    deleteCart,
    addCatToCart,
    removeCatInCart,
} = require('../controllers/cartController');

router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', addCatToCart);
router.delete('/:id', deleteCart, removeCatInCart);

module.exports = router;