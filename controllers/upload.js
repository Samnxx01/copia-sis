import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { response } from 'express';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



var imgsubido = {
  

   
    


     guadarImg: async (req, res = response) => {
      
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
          res.status(400).json({msg:'No hay archivos en la peticion.'});
          return;
        }
      
  
      
        const {imagen} = req.files

        const uploadPath = path.join(__dirname, '..', 'img-subido', imagen.name);

      
        imagen.mv(uploadPath, (err) => {
          if (err) {
            return res.status(500).json({err});
          }
      
          res.json({msg:'Archivo cargado ' + uploadPath});
        });
     
    },


};


export default imgsubido;
