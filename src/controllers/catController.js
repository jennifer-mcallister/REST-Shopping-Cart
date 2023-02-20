const Cat = require('../models/Cat');
const { BadRequestError, NotFoundError } = require('../utils/error')

exports.getCatById = async (req, res, next) => {
    console.log("trying to get cat by id");
    const catId = req.params.id;
    const cat = await Cat.findById(catId);
    if(!cat) throw new NotFoundError('That cat does not exist in our store');
    console.log(cat);
    return res.status(200).json(cat);
}

exports.getAllCats = async (req, res, next) => {
    console.log("get all my cats");
    const catId = req.params.id;
    console.log(catId)
    const cats = await Cat.find();
    return res.json(cats);
}
