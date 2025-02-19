const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const cors = require('cors');

console.log(process.env);


// Crear  el servidor de express

const app  = express();


// Base de datos 
dbConnection();

// Cors 
app.use(cors())

// Directorio publico 
app.use( express.static('public') )


// Lectura y pasrseo del body
app.use( express.json() );

// rutas 
app.use( '/api/auth' , require('./routes/auth') );
app.use( '/api/events' , require('./routes/events') );
//  todo auth  crear login renew  
// todo crud : enventos 



// escuchar peticiones

app.listen(process.env.PORT , () => {

  console.log(`Servidor en puerto ${process.env.PORT} `);
  

});
