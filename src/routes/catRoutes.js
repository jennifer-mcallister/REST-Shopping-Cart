const express = require('express');
const router = express.Router();

const {
    getAllCats
} = require('../controllers/catController');

router.get("/cats", getAllCats);

module.exports = router;