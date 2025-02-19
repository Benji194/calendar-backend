
const  { response } = require('express'); 

const getEventos = (req , res = response) => {
  return res.json({
    ok: true,
   msg : 'Obtener eventos'
  })
}

const crearEvento = (req , res = response) => {
  return res.json({
    ok: true,
   msg : 'Crear eventos'
  });
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