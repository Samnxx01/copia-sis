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


  guadarImpresora: async (req, res = response) => {
          
    
      var params = req.body;

      // Crear una instancia de Regis (si es una clase o función)
      const registro = new impresorasss({
        
          sedes: params.sedes,
          pisos: params.pisos,
          ip: params.ip,
          serial: params.serial,
          mac: params.mac,
          marca: params.marca,
          ubicacion: params.ubicacion,
          contador: params.contador,
          fecha: params.fecha,
          estado: params.estado
      });

      const guardarImpresoras = await registro.save();

      res.status(200).json({
        msg: 'Registro Completado',
        guardarImpresoras,
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
