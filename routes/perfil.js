import express from 'express';
import{ check } from'express-validator';
import validarCampos from '../middlewares/validar.campos.js';
import controllerPerfil from '../controllers/perfil.js'
import controllerComentario from '../controllers/comentarios.js'
import {esAdminRole} from '../middlewares/validar-roles.js';
import { existeIdUsuario, emailExiste} from '../helpers/db-validators.js';

//import {azucarValido} from '../helpers/db-validators.js';


import validarJWT from '../middlewares/validar-jwt-seguridad.js';

var router = express.Router()


//obtener categorias - admin
router.get('/listar',[
    validarJWT,
    esAdminRole
], controllerPerfil.listarPerfil)



//crear categorias - cualquier adminsitador valido
router.post('/guardarperfil',[
    validarJWT,
    esAdminRole,
    check('nickname','el nickname es obligatorio').not().isEmpty(),
    check('telefono','telfono').not().isEmpty(),
    check('correo', ).not().isEmpty(),
    //check('nickname', ).custom(existeIdUsuario),
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos
], controllerPerfil.guadarPerfil) 


router.put('/modificar/:id',[
    validarJWT,
    esAdminRole,
    check('nickname', ).custom( existeIdUsuario),
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdUsuario),
    validarCampos,
], controllerPerfil.modificarPerfil);

router.delete('/eliminar/:id',[  
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( ),
    validarCampos,
], controllerPerfil.eliminarPerfil);


//apis de comentarios

router.get('/listarcomen',[
    validarJWT,
    esAdminRole
], controllerComentario.listarComentario)


router.post('/guardarcomentarioAdmin',[
    validarJWT,
    esAdminRole,
    check('descripcion','el descripcion es obligatorio').not().isEmpty(),
    //check('nickname', ).custom(existeIdUsuario),
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos
], controllerComentario.guadarComentario) 

router.post('/guardarcomentarioUsu',[
    validarJWT,
    check('descripcion','el descripcion es obligatorio').not().isEmpty(),
    //check('nickname', ).custom(existeIdUsuario),
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos
], controllerComentario.guadarComentario) 


router.put('/modificar/:id',[
    validarJWT,
    esAdminRole,
    check('descripcion', ).custom( existeIdUsuario),
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdUsuario),
    validarCampos,
], controllerPerfil.modificarPerfil);

router.delete('/eliminar/:id',[  
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( ),
    validarCampos,
], controllerPerfil.eliminarPerfil,)



export default router