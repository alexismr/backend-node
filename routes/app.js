
var _express = require('express');

var app = _express();


// servicios
app.get('/',(req,resp,next) =>{
    resp.status(200).json({
        ok:true,
        mensaje:'hola desde nodejs'
    })
});


module.exports = app;