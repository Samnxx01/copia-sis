let factura = {

    listarfacturas: async (req, res = response) => {
      const {nickcname, telefono, ...body} =req.body
    
      const data ={
        ...body,
        nombre: body.nickcname,
  
        regisUsu: req.registrosUsu._id
      }
  
  
  
      const producto = await new perfilInfo(data)
      await producto.save();
      
      res.status(201).json({
        msg: 'Perfil Actualizado',
        producto
      });
    },
  
  
      guadarFactura: async (req, res = response) => {
        
  
          var params = req.body;
  
  
   
  
          // Crear una instancia de Regis (si es una clase o función)
          const registro = new perfilInfo({
              nickname: params.nickname,
              correo: params.correo,
              telefono: params.telefono,
  
          });
  
          const guardarPerfil = await registro.save();
  
          res.status(200).json({
            msg: 'Registro Completado',
            guardarPerfil,
        });
  
      },
  
        eliminarFactura: async (req, res = response) => {
          const {nickcname, telefono, ...body} =req.body
        
          const data ={
            ...body,
            nombre: body.nickcname,
      
            regisUsu: req.registrosUsu._id
          }
    
    
    
          const producto = await new perfilInfo(data)
          await producto.save();
          
          res.status(201).json({
            msg: 'Perfil Actualizado',
            producto
          });
        },
  
        modificarfactura: async (req, res = response) => {
          const {nickcname, telefono, ...body} =req.body
        
          const data ={
            ...body,
            nombre: body.nickcname,
      
            regisUsu: req.registrosUsu._id
          }
    
    
    
          const producto = await new perfilInfo(data)
          await producto.save();
          
          res.status(201).json({
            msg: 'Perfil Actualizado',
            producto
          });
        },
    
  }
  
  export default factura;
  
  