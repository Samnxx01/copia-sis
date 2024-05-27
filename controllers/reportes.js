import { response } from 'express';
import equipos from '../models/reportess-equipos.js'
import subirArchivos from '../helpers/subir-archivo-uros.js';


var reporteass = {


  listarReporte: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = { estado: true }

      const mostrarReportes = await equipos.find(query)



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
  listarReporteId: async (req, res = response) => {
    try {
      // Obtén los parámetros de filtro de la solicitud
      const { id, numero_caso } = req.query;
  
      // Construye la consulta dinámica
      const query = { estado: true };
      if (id) {
        query._id = id;
      }
      if (numero_caso) {
        query.numero_caso = numero_caso;
      }
  
      // Obtiene los registros que coinciden con la consulta
      const mostrarReportes = await equipos.find(query);
  
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


  guadarReportes: async (req, res = response) => {
    const { estado,registUros, ...body } = req.body;

    const data = {
      ...body,
      fecha: body.fecha.toUpperCase(),
      nombre_usuario: body.nombre_usuario.toUpperCase(),
      correo_electronico_usuario: body.correo_electronico_usuario.toUpperCase(),
      correo_ing: body.correo_ing.toUpperCase(),
      marca_instalado: body.marca_instalado.toUpperCase(),
      modelo_instalacion: body.modelo_instalacion.toUpperCase(),
      serial_parte: body.serial_parte.toUpperCase(),
      diagnostico: body.diagnostico.toUpperCase(),
      coordinador_area: body.coordinador_area.toUpperCase(),
      activos_fijos: body.activos_fijos.toUpperCase(),
      registrosUros: req.uid,
    };
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).send('No hay archivo para subir');
    }
  
    try {
      const archivoSubido = await subirArchivos(req.files, undefined, 'prueba');
      data.img = archivoSubido; // Añadir el nombre del archivo subido a la data
  
      const nuevoComputador = new equipos(data);
      const computadorGuardado = await nuevoComputador.save();
  
      res.json({ computadorGuardado });
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      res.status(500).json({ error: 'Error al guardar el archivo' });
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
