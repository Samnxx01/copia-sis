import { response } from 'express';
import equipos from '../models/reportess-equipos.js'


var reporteass = {


  listarReporte: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = { estado: true }

      const mostrarReportes = await equipos.find(query)
        .populate('registUros', 'nickname correo telefono rol')
        .populate('impresoras', 'marca serial contador mac')
        .populate('computadores', 'ip nombre_asignado cedula usuario');


      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
        msg: 'Listado Exitoso',
        mostrarReportes,
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


  guadarReportes: async (req, res = response) => {
    try {
      // Obtener datos del cuerpo de la solicitud
      const { fecha, numero_caso, computadores, impresoras, registUros, marca, modelo, serial_parte, fecha_instalacion, extension, estado, equipo_garantia, bajas } = req.body;

      // Crear un nuevo reporte con los datos proporcionados
      const nuevoReporte = new equipos({
        fecha,
        numero_caso,
        computadores,
        impresoras,
        registUros,
        marca,
        modelo,
        serial_parte,
        fecha_instalacion,
        extension,
        estado,
        area,
        correo_electronico,
        equipo_garantia,
        bajas
      });

      // Guardar el nuevo reporte en la base de datos
      await nuevoReporte.save();

      // Responder al cliente con el reporte creado
      res.status(201).json({
        msg: 'Reporte creado exitosamente',
        reporte: nuevoReporte
      });
    } catch (error) {
      console.error('Error al guardar el reporte:', error);
      res.status(500).json({
        error: 'Hubo un error en la operación'
      });
    }
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


export default reporteass;
