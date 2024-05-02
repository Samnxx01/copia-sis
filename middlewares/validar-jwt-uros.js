import { response } from 'express'
import jwt from 'jsonwebtoken'
import registroUro from '../models/registUros.js'



const validarJWTU = async (req, res, next) => {

  const token = req.header('codificado');
  if (!token) {
    return res.status(401).json({ msg: 'no hay peticion' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEYUROS);

    const registrosUros = await registroUro.findById(uid);

    if (!registrosUros) {
      return res.status(401).json({
        msg: 'token no valido - ID NO EXISTENTE'
      })
    }
    //verificar si el uid ESTADO 
    if (!registrosUros.estado) {
      return res.status(401).json({
        msg: 'token no valido - ESTADO'
      })

    }
    req.registrosUros = registrosUros
    //req.app.set(registrosUsu)
    next();

  } catch (error) {
    console.log(error.message)
    res.status(401).json({
      msg: 'token no valido'
    })

  }
};

export default validarJWTU;;
