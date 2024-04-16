import path from 'path'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { response } from 'express';
import subirArchivoUros from '../helpers/subir-archivo-uros.js';
import archivosSubidos from '../models/archivos-subidos.js';




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
