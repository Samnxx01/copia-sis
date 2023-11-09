import perfilInfo from '../models/perfil.js'


let perfil = {

  listarPerfil: async (req, res) => {

    try {
      // Obtiene todos los registros de la colección

      const registros = await perfilInfo.find();

     
      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
          msg: 'Listado registros',
          registros,
         
      });
  } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
          error: 'Hubo un error en la operación',
      });
  }
},

    guadarPerfil: async (req, res = response) => {
      

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

    eliminarPerfil: async (req, res = response) => {
      const {id} = req.params;
      const productosBorrada = await Productosss.findByIdAndUpdate( id)
      console.log(productosBorrada)
      res.status(200).json({
        msg: "Eliminado exitoso",
      })
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

export default perfil;
