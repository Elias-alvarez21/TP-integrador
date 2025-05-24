var Product = require('../schemas/product.schema');

module.exports = {

get:  function(id, res) {
    Product.find({ _id: id }).select('movements').exec( 
      function (err, movements) {
        if (err) {
          return res.status(500).json({
            message: 'error'
          })
        } else {
          return res.status(201).json(movements)
        }
    });
  },

create:  (req, res) => {
    Product.findOneAndUpdate(
      { _id: req.body._id }, 
      { $push: { movements:  req.body.movements}}, 
      (err, success) => {
        if (err) {
          return res.status(500).json({
            message: 'error'
          })
        } else {
          return res.status(201).json({
            message: 'saved',
            text: success._id
          })
        }
    });
  },

  delete:  (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.product }, { $pull: { movements: { _id: req.params.id }}},
      (err, success) => {
        if (err) {
          return res.status(500).json({
            message: 'error'
          })
        } else {
          return res.status(201).json({
            message: 'movement delete',
            text: success
          })
        }
    });
  }  
}
  

