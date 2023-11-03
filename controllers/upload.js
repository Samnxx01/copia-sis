import subirArchivos from '../helpers/subir-archivo.js';
import { response } from 'express';
import usuarioImg from '../models/regiUsu.js'
import productosImg from '../models/productos.js'
import path from 'path'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


var imgsubido = {
  
  listarImg: async (req, res = response) => {
      
    const {id, coleccion} = req.params
    let actualizacion

    switch (coleccion) {
      case 'regisUsu':
        actualizacion = await usuarioImg.findById(id)
        if (!actualizacion) {
          return res.status(400).json({
            msg:`No existe el usuario con el id ${id}`
          })
        }
        
        break;
        case 'productos':
          actualizacion = await productosImg.findById(id)
          if (!actualizacion) {
            return res.status(400).json({
              msg:`No existe el productos con el id ${id}`
            })
          }
          
          break;
    
      default:
        return res.status(500).json({msg:'se me olvido validar esto'})
    }

    //limpiar imagenes actulizadas
    if (actualizacion.img) {
      const pathImagen = path.join(__dirname,'../img-subida', coleccion, actualizacion.img)
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
      } 
    }
    const pathImagen = path.join(__dirname,'../assets/no-image.jpg')
    res.sendFile(pathImagen)
},
    
    


     guadarImg: async (req, res = response) => {
      
        
        try {
          const nombre = await subirArchivos (req.files,undefined, 'img' );
          res.json({
            nombre
          })
        } catch (msg) {
          res.status(400).json({msg})
          
        }

    },
    guadarImgAdmin: async (req, res = response) => {
      
        
      try {
        const nombre = await subirArchivos (req.files,undefined, 'img' );
        res.json({
          nombre
        })
      } catch (msg) {
        res.status(400).json({msg})
        
      }

  },

    ModificarImg: async (req, res = response) => {


      const {id, coleccion} = req.params
      let actualizacion

      switch (coleccion) {
        case 'regisUsu':
          actualizacion = await usuarioImg.findById(id)
          if (!actualizacion) {
            return res.status(400).json({
              msg:`No existe el usuario con el id ${id}`
            })
          }
          
          break;
          case 'productos':
            actualizacion = await productosImg.findById(id)
            if (!actualizacion) {
              return res.status(400).json({
                msg:`No existe el productos con el id ${id}`
              })
            }
            
            break;
      
        default:
          return res.status(500).json({msg:'se me olvido validar esto'})
      }

      //limpiar imagenes actulizadas
      if (actualizacion.img) {
        const pathImagen = path.join(__dirname,'../img-subida', coleccion, actualizacion.img)
        if (fs.existsSync(pathImagen)) {
          fs.unlinkSync(pathImagen)
        }
        
      }

      const nombre = await subirArchivos (req.files,undefined, coleccion );
      actualizacion.img = nombre
      
      await actualizacion.save()
      res.status(200).json({
        actualizacion
      })
  }
};


export default imgsubido;
