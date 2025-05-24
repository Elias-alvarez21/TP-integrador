const mongoose = require('mongoose')
const Schema = mongoose.Schema
var Movements = require('../schemas/movement.schema');

var productSchema = new Schema({
   _productId : Schema.Types.ObjectId,
   _categoryId : { type: Schema.Types.ObjectId, ref: 'Category' },
   description: {type: String, required: 'La descripción es obligatoria'},
   stock: Number,
   price:Number,
   enabled: Boolean,
   movements: [ Movements ]
})

module.exports = mongoose.model('Product', productSchema)