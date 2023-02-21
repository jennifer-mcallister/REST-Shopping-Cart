const Cat = require('../models/Cat');
const { BadRequestError, NotFoundError } = require('../utils/error')

exports.getCatById = async (req, res, next) => {
    const catId = req.params.id;
    const cat = await Cat.findById(catId);
    if(!cat) throw new NotFoundError('That cat does not exist in our store');
    return res.status(200).json(cat);
}

exports.getAllCats = async (req, res, next) => {
    const catId = req.params.id;
    const cats = await Cat.find();
    return res.json(cats);
}
