import { response } from 'express';
import Bajasequipo from '../controllers/bajas.js'


var bajasEqui = {


  listarImpresora: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = { estado: true }

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
      const { id, serial } = req.params;

      // Buscamos el registro por ID y serial
      const verificarPro = await impresorasss.findOne({ id, serial });

      if (!verificarPro) {
        return res.status(404).json({ msg: 'Registro no encontrado' });
      }

      res.status(200).json({
        msg: 'Impresora por ID y Serial Exitoso',
        verificarPro,
      });
    } catch (error) {
      console.error('Error en la operación:', error);

      res.status(500).json({
        error: 'Hubo un error en la operación',
      });
    }
  }
  ,
  listarImpresoraIP: async (req, res = response) => {
    try {
      const { id, ip } = req.params;

      // Buscamos el registro por ID y serial
      const verificarPro = await impresorasss.findOne({ id, ip });

      if (!verificarPro) {
        return res.status(404).json({ msg: 'Registro no encontrado' });
      }

      res.status(200).json({
        msg: 'Impresora por ID y ip Exitoso',
        verificarPro,
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
    const registro = new Bajasequipo({
      
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