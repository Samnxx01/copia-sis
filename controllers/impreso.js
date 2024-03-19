import { response } from 'express';
import impresorasss   from '../models/impresoras.js';


var impresor = {
  

   listarImpresora: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = {estado : true}

      const registrosImpreso = await impresorasss.find(query)
    
      
      
     
      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
          msg: 'Listado Exitoso',
          registrosImpreso,
         
      });
  } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
          error: 'Hubo un error en la operación',
      });
  }
},

  listarImpresoraID: async (req, res = response) => {
    try {
          const { id } = req.params;


          // Busca el registro por ID
          
          const verificarPro = await impresorasss.findById(id)
          

          if (!verificarPro) {
              return res.status(404).json({ msg: 'Registro no encontrado' });
          }

          res.status(200).json({
              msg: 'Impresora por ID Exitoso',
              verificarPro
          });
      } catch (error) {
          console.error("Error en la operación:", error);

          res.status(500).json({
              error: "Hubo un error en la operación"
          });
      }
  },


  guadarImpresora: async (req, res = response) => {
          
    const {estado, registrosUros, ...body} =req.body


      
    const data ={
      ...body,   
      registrosUros: req.uid, // Usar uid en lugar de req.registrosUros._id
    };
  
    const impresos = await new impresorasss(data);
    await impresos.save();
  
    res.status(201).json({
      msg: 'Impresora Exitoso',
      impresos
    });
  },

    modificarImpresora: async (req, res = response) => {
      const {id} = req.params
      const {estado, ...data} = req.body;
 
      /*if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
      }*/
      
      const modificacionIm = await impresorasss.findByIdAndUpdate(id, data ,{new:true})
      

      res.status(200).json({
        msg:'Modificacion Exitosa',
        modificacionIm
      })
    },

    eliminarImpresora: async (req, res = response) => {
      const {id} = req.params;
      const impresorasBorrada = await impresorasss.findByIdAndUpdate( id,{estado: false})
      console.log(impresorasBorrada)
      res.status(200).json({
        msg: "Eliminado exitoso",
      })
    }

};


export default impresor;
