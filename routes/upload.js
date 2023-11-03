import express from 'express';

import imagen from '../controllers/upload.js'
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
import validarCampos from '../middlewares/validar.campos.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';
import validarArchivosSubir from '../middlewares/validar-archivos-subidos.js'

import { check } from 'express-validator';



var router = express.Router()


//esta rutas son los filtros de cualquier busqueda, se los dejare parte admin y usuario


//listar imagenes

router.get('/admin/:coleccion/:id',[
    validarJWT,
    check('id', 'El id debe ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['regisUsu', 'productos'])),
    esAdminRole,
    validarCampos
], imagen.listarImg);

//ruta para subir archivo
router.post('/admin',[
    validarJWT,
    validarArchivosSubir,
    validarJWT,
    esAdminRole
], imagen.guadarImgAdmin)

//actualizar imagen de productos y usuarios
router.put('/admin/:coleccion/:id',[
    validarJWT,
    validarArchivosSubir,
    check('id', 'El id debe ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['regisUsu', 'productos'])),
    esAdminRole,
    validarCampos
], imagen.ModificarImg);

router.put('/usuarios/:coleccion/:id',[
    validarJWT,
    validarArchivosSubir,
    check('id', 'El id debe ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['regisUsu',])),
    validarCampos
], imagen.ModificarImg);






export default router