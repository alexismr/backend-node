

var _mongoose = require('mongoose');

var _uniqueValidation = require('mongoose-unique-validator');

var _Schema = _mongoose.Schema;


var rolesValido ={
    values:['ADMIN_ROLE','USUER_ROLE'],
    message: '{VALUE} no es un rol valido'
}


var usuarioSchema = new _Schema({
    nombre: {  type:String,required:[true,'el nombre es Requerido'] },
    email: {  type:String, unique:true, required:[true,'el nombre es Requerido'] },
    password: {  type:String, required:[true,'la contraseña es necesaria'] },
    img: {  type:String, required:false},
    role: {  type:String, required:true , default: 'USER_ROLE', enum: rolesValido }
});

usuarioSchema.plugin(_uniqueValidation , { message :' {PATH} El correo debe ser único'});



module.exports = _mongoose.model('Usuario',usuarioSchema);