import path from 'path'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { response } from 'express';
import reportesImg from '../models/reportess-equipos.js';
import computadoresImg from '../models/computadores.js';
import registUrosImg from '../models/registUros.js';
import subirArchivos from '../helpers/subir-archivo-uros.js';
import archivosDb from '../models/archivos-subidos.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


var archivosss = {

  ListarArchivo: async (req, res = response) => {
    const { id, coleccion } = req.params;
    let subidaImg;

    switch (coleccion) {
      case 'registUros':
        subidaImg = await registUrosImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el usuario con el id ${id}` });
        }
        break;

      case 'compus':
        subidaImg = await computadoresImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el computador con el id ${id}` });
        }
        break;

      case 'reportes':
        subidaImg = await reportesImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el reporte con el id ${id}` });
        }
        break;

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    //limpiar archivos subidos
    if (subidaImg.img) {
      const pathImagen = path.join(__dirname, '../db-uros', coleccion, subidaImg.img)
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
      }
      res.json({ msg: 'falta la imagen' })
    }
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImagen)
  },

  ListarArchivoDB: async (req, res = response) => {
    const { id, coleccion } = req.params;
    let subidaImg;

    switch (coleccion) {
      case 'registUros':
        subidaImg = await registUrosImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el usuario con el id ${id}` });
        }
        break;

      case 'compus':
        subidaImg = await computadoresImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el computador con el id ${id}` });
        }
        break;

      case 'reportes':
        subidaImg = await reportesImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el reporte con el id ${id}` });
        }
        break;

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    //limpiar archivos subidos
    if (subidaImg.img) {
      const pathImagen = path.join(__dirname, '../db-uros', coleccion, subidaImg.img)
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
      }
      res.json({ msg: 'falta la imagen' })
    }
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImagen)
  },





  cargarArchivo: async (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivo para subir');
      return;
    }


    //subidas de archivos
    try {

      const Archivosubido = await subirArchivos(req.files, undefined, 'prueba')
      res.json({ Archivosubido })
    } catch (msg) {
      res.status(400).json({ msg })
    }
  },


  cargarArchivoDB: async (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivo para subir');
      return;
    }


    //subidas de archivos
    try {
      const archivoSubido = req.files.archivo;
      const { name, mimetype, size } = archivoSubido;

      // Guardar el archivo subido en la base de datos
      const nuevoArchivo = new archivosDb({
        nombre: name,
        path: archivoSubido.tempFilePath, // O el camino adecuado a tu archivo subido
        mimetype: mimetype,
        size: size
      });

      // Guardar el nuevo archivo en la base de datos
      const archivoGuardado = await nuevoArchivo.save();
      const Archivosubido = await subirArchivos(req.files, undefined, 'prueba')

      res.json({ archivoGuardado, Archivosubido });
    } catch (error) {
      res.status(400).json({ error })
      console.error('Error al guardar el archivo:', error);
      res.status(500).json({ error: 'Error al guardar el archivo' });
    }
  },


  actualizarImg: async (req, res = response) => {
    const { id, coleccion } = req.params;
    let subidaImg;

    switch (coleccion) {
      case 'registUros':
        subidaImg = await registUrosImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el usuario con el id ${id}` });
        }
        break;

      case 'compus':
        subidaImg = await computadoresImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el computador con el id ${id}` });
        }
        break;

      case 'reportes':
        subidaImg = await reportesImg.findById(id);
        if (!subidaImg) {
          return res.status(400).json({ msg: `No existe el reporte con el id ${id}` });
        }
        break;

      default:
        return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    //limpiar archivos subidos
    if (subidaImg.img) {
      const pathImagen = path.join(__dirname, '../db-uros', coleccion, subidaImg.img)
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }

    const guardarArchivo = await subirArchivos(req.files, undefined, coleccion);
    subidaImg.img = guardarArchivo;

    await subidaImg.save();
    res.json(guardarArchivo);
  }
}

export default archivosss;
