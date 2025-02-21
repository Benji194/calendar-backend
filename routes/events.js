
const  { Router  } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check   } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');





const router = Router();

// Todas pasan por la validacion del jwt 
router.use(validarJWT);

//  obtener eventos  
router.get('/' , getEventos   );

// Crear un nuevo evento
router.post(
  '/' ,
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
  ] , 
  crearEvento   
);

// Actualizar evento
router.put('/:id' , actualizarEvento );

// Borrar evento 
router.delete('/:id' , eliminarEvento );

module.exports = router;