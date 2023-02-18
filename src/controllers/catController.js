const Cat = require('../models/Cat');

exports.getCatById = async (req, res, next) => {
    return res.send("cat");
}

exports.getAllCats = async (req, res, next) => {
    return res.send("cats");
}
