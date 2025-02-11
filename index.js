const express = require('express');
require('dotenv').config();

console.log(process.env);


// Crear  el servidor de express

const app  = express();

// rutas 


// Directorio publico 
app.use( express.static('public') )

// app.get('/', (  req , res ) =>{

//   // console.log("Se requiere el /");
//   res.json({
//     ok : true
//   })

// } ) ;

// escuchar peticiones

const puerto = 3001

app.listen(process.env.PORT , () => {

  console.log(`Servidor en puerto ${process.env.PORT} `);
  

});
