// requiere 
var _express = require('express');
var _mongoose = require('mongoose');

// para que las respuestas sean en json 
var _bodyParser = require('body-parser')
 

// inicializar variable 
var app = _express();


// body parse
// parse application/x-www-form-urlencoded
app.use(_bodyParser.urlencoded({ extended: false }))
app.use(_bodyParser.json())


// rutas 
var appRoutes = require('./routes/app')
var usuarioRoutes = require('./routes/usuario')
var loginroute = require('./routes/login')



// conexion bnase de datos mongose
_mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',(err ,res )=>{
    if(err) throw err;
    console.log('base de datos: \x1b[36m%s\x1b[0m', 'online');
   }
);


//middleware
app.use('/usuario',usuarioRoutes)
app.use('/',appRoutes)
app.use('/login',loginroute)







app.listen(3000,()=>{
    console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online');
});




