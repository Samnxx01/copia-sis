import deparModels from '../models/departamentosModels.js'



let departamentoss = {

      Listardepartamento: async (req, res) => {
          const ciudades = await ciudad.find();
          
          res.status(200).json({
            ciudades,
          });
      },
  
      guadarDepartamento: async (req, res = response) => {
        
  
          var params = req.body;
  
  
   
  
          // Crear una instancia de Regis (si es una clase o función)
          const registro = new deparModels({
              departamento: params.departamento,
              nombre_departamento: params.nombre_departamento,
              region: params.region
      

          });
  
          const guardarDepar = await registro.save();
  
          res.status(200).json({
            msg: 'Registro Completado',
            guardarDepar,
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
  
  export default departamentoss;
  