const Cat = require('../models/Cat');

exports.getCatById = async (req, res, next) => {
    return res.send("cat");
}

exports.getAllCats = async (req, res, next) => {
    const cats = await Cat.find();
    console.log("trying to get cats");
    console.log(cats);
    return res.json(cats);

}
