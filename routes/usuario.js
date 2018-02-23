

var _express = require('express');

var app = _express();
// para incritar las claves 
var _bcrypt = require('bcryptjs');
var Usuario = require('../models/usuario');
var _jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middleweres/autenticacion');



app.get('/',(req,resp,next) =>{
    Usuario.find({},'nombre email img role ')
    .exec(
      (err, usuarios)=>{
      if(err){
       return resp.status(500).json({
            ok:false,
            mensaje:'Error cargando usuario',
            errors:err
        })
      }
       resp.status(200).json({
        ok:true,
        mensaje:usuarios
    })
  });
});







// ==============================================
// update un nuevo usuario 
//===============================================

app.put('/:id',mdAutenticacion.verificaToken,(req,res) =>{

   var id = req.params.id;
   var body = req.body;
// buscar si el usuario exise
   Usuario.findById(id , (err,usuarioreturn) =>{
    if(err){
        return res.status(500).json({
            ok:false,
            mensaje:'Error al buscar usuario',
            errors:err
        })
    }
   if(!usuarioreturn){
    return res.status(400).json({
        ok:false,
        mensaje:`el usuario con el ${id}  no existe `,
        errors:{message: 'No existe ningun usuario'}
    })
   }
   usuarioreturn.password =':)';
   usuarioreturn.nombre= body.nombre;
   usuarioreturn.email = body.email;
   usuarioreturn.role = body.role;
    usuarioreturn.save((err,usuarioGuardado)=>{
        if(err){
           return  res.status(400).json({
            ok:true,
            mensaje:'error al actualizar usuario',
            errors:err
            });
        }
         res.status(200).json({
           ok:true,
           usuario:usuarioGuardado
         });
      });

   });



});




// ==============================================
// crear un nuevo usuario 
//===============================================
app.post('/', mdAutenticacion.verificaToken, (req,res)=>{
   var body = req.body;
   var _usuario = new Usuario({
       nombre:body.nombre,
       email:body.email,
       password:  _bcrypt.hashSync(body.password, 10),
       img:body.img,
       role:body.role
   });

   _usuario.save( (err , usuarioGuardado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mensaje:'no se pudo guardar el usuario',
                    errors:err
                })
            }
            res.status(201).json({
                ok:true,
                usuario:usuarioGuardado,
                usuariotoken: req.usuario
                });
        })
});


// ==============================================
// delete  un nuevo usuario 
//===============================================
app.delete('/:id',mdAutenticacion.verificaToken,  (req,res)=>{
   var _id  = req.params.id;

   Usuario.findByIdAndRemove(_id , (err,usuarioDelete)=>{
     if(err){
        return res.status(400).json({
            ok:false,
            mensaje:'error al eliminar',
            errors:err
        })
     }
     if(!usuarioDelete){
        return res.status(400).json({
            ok:false,
            mensaje:'no existe usuario con este id',
            errors:{mensaje:`error al eliminar con este is : ${_id}`}
        })
     }



    res.status(201).json({
        ok:true,
        usuario:usuarioDelete
        });
 
   });

});


module.exports = app;