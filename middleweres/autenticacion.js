
var _jwt = require('jsonwebtoken');
var seed = require('../config/config').SEED;

// ==============================================
// verificar token
//===============================================
exports.verificaToken = function(req,res,next){
    // token enviado por la url
    var token = req.query.token;
    _jwt.verify(token, seed, (err, decoded)=>{
        if(err){
            return  res.status(401).json({
                ok:false,
                mensaje: 'Token incorrecto',
                errors:err

            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

