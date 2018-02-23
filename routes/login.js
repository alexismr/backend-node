

var _express = require('express');
var app = _express();
// para incritar las claves 
var _bcrypt = require('bcryptjs');
var _Usuario = require('../models/usuario');
var _jwt = require('jsonwebtoken');


var seed = require('../config/config').SEED;

app.post('/',(req,res)=>{

    var _body = req.body;
_Usuario.findOne({email:_body.email},(err,UsuarioDB)=>{

    if(err){
        return res.status(500).json({
            ok:false,
            mensaje:'error login',
            errors:err
        })
    }
    if(!UsuarioDB){
        return res.status(500).json({
            ok:false,
            mensaje:'Credenciales incorrectas -- email',
            errors:err
        })
    }

    if(!_bcrypt.compareSync(_body.password ,UsuarioDB.password)){
        return  res.status(400).json({
            ok:false,
            message:`Credenciales incorrectas --- password`,
            body:_body
        });

    }

    UsuarioDB.password =':)';
// crear un token
 var token = _jwt.sign(
     {usuario:UsuarioDB},
     seed,
     {expiresIn: 14400}
    );


    res.status(200).json({
        token:token,
        ok:true,
        UsuarioDB:UsuarioDB,
        id:UsuarioDB.id
    });


});


  
});




module.exports = app;

