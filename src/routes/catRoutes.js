const express = require('express');
const router = express.Router();

const {
    getAllCats, 
    getCatById,
} = require('../controllers/catController');

router.get("/", getAllCats);
router.get('/:id', getCatById);

module.exports = router;