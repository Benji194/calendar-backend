
const  { response } = require('express'); 

const Evento = require('../models/Evento');

const getEventos = (req , res = response) => {
  return res.json({
    ok: true,
   msg : 'Obtener eventos'
  })
}

const crearEvento = async (req , res = response) => {

  try {
    // verificar que tenga el evento
    const evento = new Evento( req.body );
    
    evento.user = req.uid ;
    const eventoGuardado  = await  evento.save();

    return res.status(201).json({
      ok: true,
      evento : eventoGuardado
    });

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      ok: false,
      msg : 'Hable con el administrador'
    });
    
  }


}

const actualizarEvento = (req , res = response) => {
  return res.json({
    ok: true,
   msg : 'Actualizar eventos'
  });
}

const eliminarEvento = (req , res = response) => {
  return res.json({
    ok: true,
   msg : 'Eliminar eventos'
  });
}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
}