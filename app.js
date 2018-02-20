// requiere 
var _express = require('express');
var _mongoose = require('mongoose');
 

// inicializar variable 
var app = _express();


// conexion bnase de datos mongose
_mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',(err ,res )=>{
    if(err) throw err;
    console.log('base de datos: \x1b[36m%s\x1b[0m', 'online');
   }
);



app.listen(3000,()=>{
    console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online');
});


// servicios
app.get('/',(req,resp,next) =>{
    resp.status(200).json({
        ok:true,
        mensaje:'hola desde nodejs'
    })
});


