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

  listar: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      
      const ListarImagenes = await archivosDb.find()

      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
        msg: 'Listado Exitoso',
        ListarImagenes,
      });
    } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
        error: 'Hubo un error en la operación',
      });
 
    }
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
  
        case 'ArchivosSubidos':
            subidaImg = await archivosDb.findById(id);
            if (!subidaImg) {
                return res.status(400).json({ msg: `No existe el reporte con el id ${id}` });
            }
            break;
  
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }
  
    // Construir la ruta del archivo
    if (subidaImg.img) {
        const pathImagen = path.join(__dirname, '../db-uros', 'prueba', subidaImg.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        } else {
            return res.sendFile(path.join(__dirname, '../assets/no-image.jpg'));
        }
    }
  
    return res.sendFile(path.join(__dirname, '../assets/no-image.jpg'));
},
  




  cargarArchivo: async (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivo para subir');
      return;
    }


    //subidas de archivos
    try {

      const Archivosubido = await subirArchivos(req.files, undefined, 'guardar')
      res.json({ Archivosubido })
    } catch (msg) {
      res.status(400).json({ msg })
    }
  },


  cargarArchivoDB: async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No hay archivo para subir');
    }

    try {
        // Subir el archivo y obtener el nombre temporal
        const archivoSubido = await subirArchivos(req.files, undefined, 'prueba');

        // Guardar la información del archivo en la base de datos
        const nuevoArchivo = new archivosDb({
            img: archivoSubido // Guardar el nombre único del archivo en el campo img
        });

        const archivoGuardado = await nuevoArchivo.save();

        res.json({ archivoGuardado, archivoSubido });
    } catch (error) {
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

        case 'ArchivosSubidos':
          subidaImg = await archivosDb.findById(id);
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
