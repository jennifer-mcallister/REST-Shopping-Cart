const Cat = require('../models/Cat');
const { BadRequestError, NotFoundError } = require('../utils/error')

exports.getCatById = async (req, res, next) => {
    try {
        const catId = req.params.catId;
        const cat = await Cat.findById(catId);
        if(!cat) throw new NotFoundError('That cat does not exist in our store');
        return res.status(200).json(cat);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: error.message,
        });
    }
}

exports.getAllCats = async (req, res, next) => {
    const cats = await Cat.find();
    return res.json(cats);
}

