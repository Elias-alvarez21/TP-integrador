const mongoose = require('mongoose')
const Schema = mongoose.Schema

var categorySchema = new Schema({
   _categoryId : Schema.Types.ObjectId,
   categoryName: String 
})

module.exports = mongoose.model('Category', categorySchema)
