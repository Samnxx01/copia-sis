import { response } from 'express';
import Bajasequipo from '../models/bajas.js'


var bajasEqui = {


  listarBajas: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = { estado: true }

      const listarBajass = await Bajasequipo.find(query)


      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
        msg: 'Listado Exitoso',
        listarBajass,

      });
    } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
        error: 'Hubo un error en la operación',
      });
    }
  },




  guadarbajas: async (req, res = response) => {

    var params = req.body;

    const nuevoReporte = new Bajasequipo({
        numero_bajas: params.numero_bajas,
        tipo_parte: params.tipo_parte,
        serial_parte: params.serial_parte,
        diagnostico: params.diagnostico,
    });

    const guardarReportes = await nuevoReporte.save();

    res.status(200).json({
        msg: 'Registro Completado',
        guardarReportes
    });

},

  modificarImpresora: async (req, res = response) => {
    const { id } = req.params
    const { estado, ...data } = req.body;

    /*if (data.nombre) {
      data.nombre = data.nombre.toUpperCase();
    }*/

    const modificacionIm = await impresorasss.findByIdAndUpdate(id, data, { new: true })


    res.status(200).json({
      msg: 'Modificacion Exitosa',
      modificacionIm
    })
  },

  eliminarImpresora: async (req, res = response) => {
    const { id } = req.params;
    const impresorasBorrada = await impresorasss.findByIdAndUpdate(id, { estado: false })
    console.log(impresorasBorrada)
    res.status(200).json({
      msg: "Eliminado exitoso",
    })
  }
};


export default bajasEqui;