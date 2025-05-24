var Product = require('../schemas/product.schema');
var Category = require('../schemas/category.schema');

class ProductService {

  constructor(){
    this.products = [];
  }

  async get(req, res) {//dentro de esta funcion realiza un innerjoin con mongodb agregation
     Category.aggregate([
        {  $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_categoryId",
            as: "products"
          }
        },  {
          "$project": {
            "products._id": 1,
            "products.categoryId": 1,
            "categoryName": 1,
            "products.description": 1,
            "products.stock": 1,
            "products.price": 1, //Para seleccionar campos
           }
        }]). 
    exec(function(err, products) {
      if(err) {
        return res.status(500).json( {
          message: 'Error',
          error: err
        })
      } else
      return res.status(201).json(products)
    })  
}  

async create(req, res) {
    var product = new Product(req.body)
    product.save(function(err, product){
    if(err) {
      return res.status(500).json( {
        message: 'Error in create',
        error: err
      })
    } else
    return res.status(201).json({
      message: 'saved',
      _id: product._id
    })
  })  
}

async delete(id, res) {
  Product.deleteOne({_id : id}, function(err, product){
  if(err) {
    return res.status(500).json( {
      message: 'Error in delete',
      error: err
    })
  } else
  return res.status(200).json({
    message: 'deleted',
    _id: product
  })
})  
}

async update(req, res) {
  Product.findByIdAndUpdate(req.body._id, { description: req.body.description, stock: req.body.stock, price: req.body.price}, function(err, product){
  if(err) {
    return res.status(500).json( {
      message: 'Error in update',
      error: err
    })
  } else
  return res.status(200).json({
    message: 'updated',
    _id: product._id
  })
})  
}

async state(id, res) {
    Product.findOne({ _id: id }, function(err, product) {
    product.enabled = !product.enabled;
    product.save(function(err, success) {
  if(err) {
    return res.status(500).json( {
      message: 'Error in change state',
      error: err
    })
  } else
  return res.status(200).json({
    message: 'state change',
    _id: success._id
  })
})
})  
}

async getMovement (req, res) {
  try {
        const { id, direction } = req.params;
        
        if (direction !== "Entrante" && direction !== "Saliente") { 
            return res.status(400).json({ message: "Direccion invalida. Usa Entrante o Saliente" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const filMovements = product.movements.filter(m => m.direction === direction);// filter() funciona como un foreach,
                                                                                //pero devuelve un array con los elementos que cumplen la condicion

        res.status(200).json({ 
            productId: product._id, 
            description: product.description, 
            movements: filMovements 
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener movements", error });
    }
}
}
module.exports = ProductService;