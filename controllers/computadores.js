import { response } from 'express';
import computadores from '../models/computadores.js';


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
  listarCompuFiltrado: async (req, res = response) => {
    try {
        const { nombre_asignado, cedula } = req.query;

        // Construye la consulta para filtrar por nombre asignado y cédula si se proporcionan en la solicitud
        const query = { estado: true };
        if (nombre_asignado) query.nombre_asignado = nombre_asignado;
        if (cedula) query.cedula = cedula;

        // Agrupa los registros por nombre asignado y cédula
        const listaComputadores = await computadores.aggregate([
            { $match: query },
            {
                $group: {
                    _id: { nombre_asignado: "$nombre_asignado", cedula: "$cedula" },
                    // Muestra solo el primer registro de cada grupo
                    registro: { $first: "$$ROOT" }
                }
            },
            { $replaceRoot: { newRoot: "$registro" } }
        ]);

        // Envía los registros como respuesta en formato JSON
        res.status(200).json({
            msg: 'Listado Exitoso',
            listarCompu: listaComputadores,
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
      const { id, serial } = req.params;

      // Buscamos el registro por ID y serial
      const verificarPro = await computadores.findOne({ id, serial });

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
    const { estado, regisUsu, ...body } = req.body



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
      registrosUros: req.uid
    }



    const computadors = await new computadores(data)
    await computadors.save();

    res.status(201).json({
      msg: 'Registro Exitoso',
      computadors
    });
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
