import express from 'express';

import imagen from '../controllers/upload.js'
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
import validarCampos from '../middlewares/validar.campos.js';
import { esAdminRole } from '../middlewares/validar-roles.js';



var router = express.Router()


//esta rutas son los filtros de cualquier busqueda, se los dejare parte admin y usuario


router.post('/admin',[

], imagen.guadarImg)






export default router