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

module.exports = router;