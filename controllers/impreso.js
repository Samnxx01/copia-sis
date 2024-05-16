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
      const { id, serial, ip, sedes, mac, pisos, ubicacion } = req.query; // Usar req.query para obtener los parámetros de la consulta
  
      // Construir el filtro para la búsqueda
      const filtro = {};
  
      if (id) filtro._id = id;
      if (serial) filtro.serial = serial;
      if (ip) filtro.ip = ip;
      if (sedes) filtro.sedes = sedes;
      if (mac) filtro.mac = mac;
      if (pisos) filtro.pisos = pisos;
      if (ubicacion) filtro.pisos = pisos;
  
      // Buscar el registro que coincida con el filtro
      const verificarPro = await impresorasss.findOne(filtro);
  
      if (!verificarPro) {
        return res.status(404).json({ msg: 'Registro no encontrado' });
      }
  
      res.status(200).json({
        msg: 'Impresora por ID y otros parámetros exitoso',
        verificarPro,
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
