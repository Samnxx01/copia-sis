import express from 'express';

import {buscar} from '../controllers/buscar.js'
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
import { esAdminRole } from '../middlewares/validar-roles.js';



var router = express.Router()


//esta rutas son los filtros de cualquier busqueda, se los dejare parte admin y usuario


router.get('/admin/:coleccion/:termino',[
    validarJWT,
    esAdminRole
], buscar.buscarAdmin)



router.get('/usuarios/:coleccion/:termino',[
    validarJWT
], buscar.buscarUsu)


export default router