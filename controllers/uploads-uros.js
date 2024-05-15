import path from 'path'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { response } from 'express';
import subirArchivoUros from '../helpers/subir-archivo-uros.js';

import reportesImg from '../models/reportess-equipos.js';
import computadoresImg from '../models/computadores.js';
import registUrosImg from '../models/registUros.js';
import subirArchivos from '../helpers/subir-archivo-uros.js';




var archivosss = {

    cargarArchivo: async(req, res = response) =>{

  
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
          res.status(400).send('No hay archivo para subir');
          return;
        }
      

        //subidas de archivos
      const pathCompleto = await subirArchivoUros(req.files)

      res.json({
        path: pathCompleto
      })

    
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
  
      const guardarArchivo = await subirArchivos(req.files, undefined, coleccion);
      subidaImg.img = guardarArchivo;
  
      await subidaImg.save();
      res.json(guardarArchivo);
  },
  

    cargarArchivoDB: async(req, res = response) =>{

  
      if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send('No hay archivo para subir');
        return;
      }
    
      const archivo = new archivosSubidos({
        nombre: req.files.archivo.name,
        path: req.files.archivo.path,
        mimetype: req.files.archivo.mimetype,
        size: req.files.archivo.size,
      }); 
      console.log(archivo)
    
      try {
        await archivo.save();
        res.json({
          success: true,
          message: 'Archivo subido exitosamente',
          archivo,
        });
      } catch (error) {
        console.error('Error al subir el archivo:', error);
        res.status(500).json({
          success: false,
          message: 'Error al guardar el archivo en la base de datos',
        });
      }
  }
}

export default archivosss;
