var Category = require('../schemas/category.schema');
const products = require('../schemas/product.schema');

exports.create = function(req, res) {
  var category = new Category(req.body)
    category.save(function(err, category){
    if(err) {
      return res.status(500).json( {
        message: 'Error',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: category._id
    })
  })  
};

exports.get = async function(req, res) {
    try {
        const { category } = req.params;
        const filt = category ? { categoryName: category } : {};

        const categories = await Category.aggregate([
            { $match: filt },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_categoryId",
                    as: "products"
                }
            },
            {
                $project: {
                    "_id": 1, 
                    "categoryName": 1,  
                    "products._id": 1,  
                    "products.category": 1,
                    "products.description": 1,
                    "products.stock": 1,
                    "Cantidad de productos": { $size: "$products" } 
                }
            }
        ]);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener datos", error });
    }
};
