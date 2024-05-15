import express from 'express';
import imagen from '../controllers/uploads-uros.js'
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
import validarCampos from '../middlewares/validar.campos.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';
import validarArchivosSubir from '../middlewares/validar-archivo-subidoUros.js'
import subir from '../controllers/uploads-uros.js'
import { check } from 'express-validator';
import validarJWTU from '../middlewares/validar-jwt-uros.js';



var router = express.Router()


//esta rutas son los filtros de cualquier busqueda, se los dejare parte admin y usuario
router.post('/subirarchivos', subir.cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivosSubir,
    check('id', 'El id debe ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['registUros', 'compus','reportes'])),
    validarCampos
], subir.actualizarImg)
/*
router.put('/admin/:coleccion/:id',[
    validarJWT,
    validarArchivosSubir,
    check('id', 'El id debe ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['regisUsu', 'productos'])),
    esAdminRole,
    validarCampos
], subir.actualizarImg);

//listar imagenes

router.get('/admin/:coleccion/:id',[
    validarJWT,
    check('id', 'El id debe ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['regisUsu', 'productos'])),
    esAdminRole,
    validarCampos
], subir.cargarArchivoDB);

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




*/

export default router