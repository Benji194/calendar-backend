
const  { response } = require('express'); 

const Evento = require('../models/Evento');

const getEventos = async (req , res = response) => {

  try {

    const eventos = await Evento.find()
            .populate('user', 'name');

    return res.json({
      ok: true,
      eventos
    })
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg : 'Hable con el administrador'
    });
    
  }


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

const actualizarEvento = async (req , res = response) => {

  const eventoId = req.params.id ;
  const uid = req.uid ;

  try {

    const evento = await Evento.findById( eventoId ) ;

    if (!evento  ) {
      return res.status(404).json({
        ok : false ,
        msg : 'El evento no existe por ese id '
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok : false ,
        msg : 'No tiene privilegio de editar este evento'
      });
    }

    const nuevoEvento = {
       ...req.body,
       user : uid 
    }

    await  Evento.findByIdAndUpdate( eventoId , nuevoEvento, { new:  true }  );

    return res.json({
      ok: true,
    });
    
  } catch (error) {
    
    console.log(error);
    

    return res.status(500).json({
      ok: false,
      msg : 'hable con el administrador'
    });
  }



}

const eliminarEvento =  async (req , res = response) => {

  const eventoId = req.params.id ;
  const uid = req.uid ;

  try {

    const evento = await Evento.findById( eventoId ) ;

    if (!evento  ) {
      return res.status(404).json({
        ok : false ,
        msg : 'El evento no existe por ese id '
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok : false ,
        msg : 'No tiene privilegio de eliminar este evento'
      });
    }

    const eventoEliminado = await  Evento.findByIdAndDelete( eventoId );

    return res.json({
      ok: true,
      eventoEliminado
    });
    
  } catch (error) {

    console.log(error);
    

    return res.status(500).json({
      ok: false,
      msg : 'hable con el administrador'
    });
    
  }


}

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
}