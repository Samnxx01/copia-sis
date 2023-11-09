import { response } from 'express';
import comentarios   from '../models/comentarios.js';


var comentariosss = {
  

   listarComentario: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const id = req.params.id
      const query = {estado : true}

      const registros = await comentarios.find(query, id)
      .populate('regisUsu', 'nickname')
    
      const total = await comentarios.countDocuments(query)
      
     
      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
          msg: 'Listado Exitoso',
          total,
          registros,
         
      });
  } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
          error: 'Hubo un error en la operación',
      });
  }
},


    guadarComentario: async (req, res = response) => {
      const {estado, regisUsu, ...body} =req.body


      
      const data ={
        ...body,
  
        regisUsu: req.registrosUsu._id
      }



      const producto = await new comentarios(data)
      await producto.save();
      
      res.status(201).json({
        msg: 'comentario Exitoso',
        producto
      });
    },

    modificarProducto: async (req, res = response) => {
      const {id} = req.params
      const {estado,regisUsu, ...data} = req.body;
 
      /*if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
      }*/
      
      data.regisUsu = req.registrosUsu._id;
      const productos = await Productosss.findByIdAndUpdate(id, data ,{new:true})
      .populate('regisUsu', 'nickname')
      .populate('categoria', 'nombre');

      res.status(200).json({
        msg:'Modificacion Exitosa',
        productos
      })
    },

    eliminarProducto: async (req, res = response) => {
      const {id} = req.params;
      const productosBorrada = await Productosss.findByIdAndUpdate( id,{estado: false, disponible:false},{new: true})
      console.log(productosBorrada)
      res.status(200).json({
        msg: "Eliminado exitoso",
      })
    }

};


export default comentariosss;
