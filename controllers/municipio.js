import ModelsMuni from '../models/muncipio.js'

let munciipioss = {



      listar: async (req, res) => {
        try {
          const registrosPaises = await pais.find().populate('ciudad', 'nombre_ciudad');
          
          // Devolver un objeto con la clave "registro"
          res.status(200).json({
           registrosPaises,
          });
        } catch (error) {
          console.error('Error en la operación:', error);
          res.status(500).json({
            error: 'Hubo un error en la operación',
          });
        }
      },
    
  
      guadarMunicipio: async (req, res = response) => {
        
  
          var params = req.body;
  
  
   
  
          // Crear una instancia de Regis (si es una clase o función)
          const registro = new ModelsMuni({
            
              municipio: params.municipio.toUpperCase(),
              nombre_municipio: params.nombre_municipio.toUpperCase(),
              postal: params.postal
  
          });
  
          const guardarPais = await registro.save();
  
          res.status(200).json({
            msg: 'Registro Completado',
            guardarPais,
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
  
  export default munciipioss;
  