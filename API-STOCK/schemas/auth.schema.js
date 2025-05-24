const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

var userSchema = new Schema({
  username: { type: String, required: 'El nombre es necesario'},
  email: { type: String, unique: true, required: "El correo es necesario"},
  password: { type: String, required: "La contraseña es obligatoria"},
  isadmin: { type: Boolean, default: 0},
  })

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }  

 userSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('User', userSchema)
