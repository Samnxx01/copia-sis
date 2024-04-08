import { response } from 'express';
import computadores   from '../models/computadores.js';


var computa = {
  

   listarCompu: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = {estado : true}

      const listarCompu = await computadores.find(query)
    
      
      
     
      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
          msg: 'Listado Exitoso',
          listarCompu,
         
      });
  } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
          error: 'Hubo un error en la operación',
      });
  }
},


    guadarComputador: async (req, res = response) => {
      const {estado, regisUsu, ...body} =req.body


      
      const data ={
        ...body,
  
        regisUsu: req.registrosUsu._id
      }



      const computadors = await new computadores(data)
      await computadors.save();
      
      res.status(201).json({
        msg: 'comentario Exitoso',
        computadors
      });
    },

    modificarComentario: async (req, res = response) => {
      const {id} = req.params
      const {estado,regisUsu, ...data} = req.body;
 
      /*if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
      }*/
      
      data.regisUsu = req.registrosUsu._id;
      const productos = await computadores.findByIdAndUpdate(id, data ,{new:true})
      .populate('regisUsu', 'nickname')
      

      res.status(200).json({
        msg:'Modificacion Exitosa',
        productos
      })
    },

    eliminarComentario: async (req, res = response) => {
      const {id} = req.params;
      const productosBorrada = await computadores.findByIdAndUpdate( id,{estado: false, disponible:false},{new: true})
      console.log(productosBorrada)
      res.status(200).json({
        msg: "Eliminado exitoso",
      })
    }

};


export default computa;
