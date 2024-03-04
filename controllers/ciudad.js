import ciudad from '../models/ciudad.js'



let ciudades = {

      listarCiudadesPorPais: async (req, res) => {
          const ciudades = await ciudad.find();
          
          res.status(200).json({
            ciudades,
          });
      },
  
      guadarCiudad: async (req, res = response) => {
        
  
          var params = req.body;
  
  
   
  
          // Crear una instancia de Regis (si es una clase o función)
          const registro = new ciudad({
              ciudad: params.ciudad,
              nombre_ciudad: params.nombre_ciudad,
      

          });
  
          const guardarCiudad = await registro.save();
  
          res.status(200).json({
            msg: 'Registro Completado',
            guardarCiudad,
        });
  
      },
  
        eliminarPerfil: async (req, res = response) => {
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
  
        modificarPerfil: async (req, res = response) => {
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
  
  export default ciudades;
  