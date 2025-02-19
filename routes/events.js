
const  { Router  } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Todas pasan por la validacion del jwt 
router.use(validarJWT);

//  obtener eventos  
router.get('/' , getEventos   );

// Crear un nuevo evento
router.post('/' , crearEvento   );

// Actualizar evento
router.put('/:id' , actualizarEvento );

// Borrar evento 
router.delete('/:id' , eliminarEvento );

module.exports = router;