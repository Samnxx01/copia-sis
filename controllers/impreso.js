import { response } from 'express';
import impresorasss from '../models/impresoras.js';


var impresor = {


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
      // Obtener parámetros de ruta
      const {  serial } = req.params;
  
      // Buscar registro en la base de datos por el campo id y serial
      const compuVeri = await impresorasss.findOne({  serial });
  
      if (!compuVeri) {
        return res.status(404).json({ msg: 'Registro no encontrado' });
      }
  
      res.status(200).json({
        msg: 'Búsqueda por serial exitosa',
        compuVeri,
      });
    } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
        error: 'Hubo un error en la operación',
      });
    }
  },

  listarImpresoraIDPrueba: async (req, res = response) => {
    try {
      // Obtener parámetros de ruta
      const { serial , ip } = req.params;
      console.log(serial, ip)
      // Construir el objeto de consulta
      const consulta = {};

      if (serial) consulta.serial = serial;
      if (ip) consulta.ip = ip;
      
  
      // Buscar registros en la base de datos que coincidan con los parámetros proporcionados
      const impresora = await impresorasss.find(consulta);
  
      if (!impresora || impresora.length === 0) {
        return res.status(404).json({ msg: 'No se encontraron registros que coincidan con los parámetros proporcionados' });
      }
  
      res.status(200).json({
        msg: 'Búsqueda exitosa',
        impresora,
      });
    } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
        error: 'Hubo un error en la operación',
      });
    }
  },
  
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


  guadarImpresora: async (req, res = response) => {

    const { estado, registrosUros, ...body } = req.body



    const data = {
      ...body,
      sedes: body.sedes.toUpperCase(),
      pisos: body.pisos.toUpperCase(),
      ip: body.ip.toUpperCase(),
      serial: body.serial.toUpperCase(),
      mac: body.mac.toUpperCase(),
      marca: body.marca.toUpperCase(),
      ubicacion: body.ubicacion.toUpperCase(),
      contador: body.contador.toUpperCase(),
      fecha: body.fecha.toUpperCase(),
      registrosUros: req.uid, // Usar uid en lugar de req.registrosUros._id

    };
    console.log(registrosUros)


    const impresos = await new impresorasss(data);
    await impresos.save();

    res.status(201).json({
      msg: 'Impresora Exitoso',
      impresos
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


export default impresor;
