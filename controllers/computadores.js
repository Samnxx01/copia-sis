import { response } from 'express';
import computadores from '../models/computadores.js';
import subirArchivos from '../helpers/subir-archivo-uros.js';

var computa = {


  listarCompu: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const query = { estado: true }

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


  listarComputadoresID: async (req, res = response) => {
    try {
      // Obtener parámetros de consulta
      const { fecha, serial, area, mac, ip, marca, ubicacion, cedula, placa, sede } = req.query;

      // Crear objeto de filtros basado en los parámetros de consulta
      const filtros = {};

      if (fecha) filtros.fecha = fecha;
      if (serial) filtros.serial = serial;
      if (mac) filtros.mac = mac;
      if (area) filtros.area = area;
      if (ip) filtros.ip = ip;
      if (placa) filtros.placa = placa;
      if (marca) filtros.marca = marca;
      if (ubicacion) filtros.ubicacion = ubicacion;
      if (cedula) filtros.cedula = cedula;
      if (sede) filtros.sede = sede;

      // Buscar registros en la base de datos que coincidan con los filtros
      const compuVeri = await computadores.findOne(filtros);


      if (!compuVeri) {
        return res.status(404).json({ msg: 'Registro no encontrado' });
      }

      res.status(200).json({
        msg: 'Impresora por ID y otros parámetros exitoso',
        compuVeri,
      });
    } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
        error: 'Hubo un error en la operación',
      });
    }
  },
  listarComputadoresIP: async (req, res = response) => {
    try {
      const { id, ip } = req.params;

      // Buscamos el registro por ID y serial
      const verificarPro = await computadores.findOne({ id, ip });

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



  guadarComputador: async (req, res = response) => {
    const { estado, regisUsu, ...body } = req.body;

    const data = {
      ...body,
      fecha: body.fecha.toUpperCase(),
      sede: body.sede.toUpperCase(),
      ubicacion: body.ubicacion.toUpperCase(),
      marca: body.marca.toUpperCase(),
      nombre_equipo: body.nombre_equipo.toUpperCase(),
      sistema_operativo: body.sistema_operativo.toUpperCase(),
      placa: body.placa.toUpperCase(),
      disco_duro: body.disco_duro.toUpperCase(),
      memoria_ram: body.memoria_ram.toUpperCase(),
      serial: body.serial.toUpperCase(),
      ip: body.ip.toUpperCase(),
      usuario: body.usuario.toUpperCase(),
      clave: body.clave.toUpperCase(),
      nombre_asignado: body.nombre_asignado.toUpperCase(),
      cedula: body.cedula.toUpperCase(),
      fecha_mantenimiento: body.fecha_mantenimiento.toUpperCase(),
      tecnico: body.tecnico.toUpperCase(),
      dominio: body.dominio.toUpperCase(),
      observaciones: body.observaciones.toUpperCase(),
      registrosUros: req.uid,
    };
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).send('No hay archivo para subir');
    }
  
    try {
      const archivoSubido = await subirArchivos(req.files, undefined, 'prueba');
      data.img = archivoSubido; // Añadir el nombre del archivo subido a la data
  
      const nuevoComputador = new computadores(data);
      const computadorGuardado = await nuevoComputador.save();
  
      res.json({ computadorGuardado });
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      res.status(500).json({ error: 'Error al guardar el archivo' });
    }
  },

  modificarCompu: async (req, res = response) => {
    const { id } = req.params
    const { estado, ...data } = req.body;

    /*if (data.nombre) {
      data.nombre = data.nombre.toUpperCase();
    }*/

    const modificacionCompu = await computadores.findByIdAndUpdate(id, data, { new: true })


    res.status(200).json({
      msg: 'Modificacion Exitosa',
      modificacionCompu
    })
  },

  eliminarComputadora: async (req, res = response) => {
    const { id } = req.params;
    const ComputadorBorrada = await computadores.findByIdAndUpdate(id, { estado: false })
    console.log(ComputadorBorrada)
    res.status(200).json({
      msg: "Eliminado exitoso",
      ComputadorBorrada
    })
  }


};


export default computa;
