import { response } from 'express'



const validarArchivosSubirUros = async (req, res = response , next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay archivos en la peticion .'});
       
      }   
       
    next();
}
export default validarArchivosSubirUros;