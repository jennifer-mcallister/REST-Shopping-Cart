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
router.post('/:id', addCatToCart);
router.put('/:id', removeCatInCart)
router.delete('/:id', deleteCart);

module.exports = router;