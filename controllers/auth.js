const  { response } = require('express');

const  bcrypt  = require('bcryptjs')

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (  req , res = response ) =>{

  const {   email  , password } = req.body;

  try {

    let usuario = await Usuario.findOne({ email  });
    
    if ( usuario ) {
      
      return res.status(400).json({
        ok : false,
        mgs : 'Eso correo ya fue utilizado intenta con otro'
      })
    }
    

    usuario = new Usuario( req.body );

    // Encriptar contraseña 
    const salt =  bcrypt.genSaltSync(); 
    usuario.password = bcrypt.hashSync( password , salt );


    await usuario.save();

    const token = await generarJWT( usuario._id , usuario.name )
  
    res.status(201).json({
      ok : true,
      uid: usuario._id,
      name: usuario.name,
      token
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mgs : 'Por favor hable con el administrador '
    })
  }

 

} 

const loginUsuario = async (  req , res  = response ) =>{

  try {

    const {   email  , password } = req.body;
    
    let usuario = await Usuario.findOne({ email  });
    
    if ( !usuario ) {
      
      return res.status(400).json({
        ok : false,
        mgs : 'Usuario o Contraseña Incorrectos'
      })
    }

    //*  confirmar los paswords

    const validPassword = bcrypt.compareSync( password , usuario.password )

    if (!validPassword ) {
      return res.status(400).json({
        ok : false,
        mgs : 'Usuario o Contraseña Incorrectos'
      })
    }

    // Generar nuestro JWT
    const token = await generarJWT( usuario._id , usuario.name )

    res.json({
      ok : true,
      uid: usuario._id,
      name: usuario.name,
      token
    })
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      mgs : 'Por favor hable con el administrador '
    })
  }

}  

const revalidarToken =  async (  req , res = response ) =>  {

  const { uid , name } = req  

  
  // Generar nuestro JWT
  const token = await generarJWT( uid , name )

  res.json({
    ok : true,
    token

  })

}

module.exports = {
  crearUsuario, 
  loginUsuario,
  revalidarToken,

}  ;