const validarJWTU = async (req, res, next) => {
    
    const token = req.header('codificado');
    if (!token) {
      return res.status(401).json({ msg: 'no hay peticion' });
    }
  
    try {
      const { uid } = jwt.verify(token, process.env.SECRETKEY);
  
      const registrosUros = await registroUro.findById(uid);
  
      if (!registrosUros) {
        return res.status(401).json({ msg: 'token no valido - ID NO EXISTENTE' });
      }
  
      if (!registrosUros.estado) {
        return res.status(401).json({ msg: 'token no valido - ESTADO' });
      }
  
      // Adjuntar solo uid a req
      req.uid = registrosUros.uid;
      console.log(req.uid); // Verificar el valor de uid en el servidor
  
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ msg: 'token no valido' });
    }
  };
  
  export default validarJWTU;
  