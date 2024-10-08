import express from 'express';
import{ check } from'express-validator';
import controller from '../controllers/message.js';
import registro from '../controllers/RegiUsu.js'
import validarCampos from '../middlewares/validar.campos.js'
import validarJWT from '../middlewares/validar-jwt-seguridad.js'
import {esRoleValido, existeIdCiudad, existeIdPais} from '../helpers/db-validators.js';
import {esRoleValidoAdmin} from '../helpers/db-validators.js';
import {emailExiste} from '../helpers/db-validators.js';
import {nombreExiste} from '../helpers/db-validators.js';
import {existeIdUsuario} from '../helpers/db-validators.js';
import {esAdminRole} from '../middlewares/validar-roles.js';

//import {esTenerRoles} from '../middlewares/validar-roles.js'

esRoleValidoAdmin


var router = express.Router()
//definicion de rutas 

router.post('/save', controller.save)
router.get('/messages',controller.getMessages)


 
//EL HEADER PARA EL FRONT -> METASPLOIT EL TOKEN EN EL POSTMAN

//rutas de registro
router.post('/guardarRegistro/usuario',[
    //validacion de campos
    check('nickname', 'El nickname es obligatorio').not().isEmpty(),
    check('nickname', ).custom( nombreExiste),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'correo no es valido').isEmail(),
    check('correo', ).custom( emailExiste),
    check('password', 'contraseña no es valido').isLength({ min: 6}),
    check('telefono', ' El telefono es obligatorio').not().isEmpty(),
    check('ciudad',  'no es un id ciudad mongo').isMongoId(), check('ciudad').custom(existeIdCiudad),
    check('pais', 'no es un id pais mongo').isMongoId(),
    check('pais').custom(existeIdPais),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol', ).custom( esRoleValido),
    validarCampos,
], registro.guardar)

//rutas de registro
router.post('/guardarRegistro/admin',[
    //validacion de campos
    check('nickname', 'El nickname es obligatorio').not().isEmpty(),
    check('nickname', ).custom( nombreExiste),
    check('correo', 'correo no es valido').isEmail(),
    check('correo', ).custom( emailExiste),
    check('password', 'contraseña no es valido').isLength({ min: 6}),
    check('telefono', ' El telefono es obligatorio').not().isEmpty(),
    check('ciudad',  'la ciudad es obligatorio').not().isEmpty(),
    check('pais', 'no es un id pais mongo').isMongoId(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol', ).custom( esRoleValidoAdmin),
    validarCampos,
], registro.guardarAdmin)



//listar los registro
router.get('/listarRegistro',
 validarJWT,
 esAdminRole,
 registro.listar)


//modificar registro

router.put('/modificar/:id',[
    validarJWT,
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    esAdminRole,
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('rol', ).custom( esRoleValido),
    validarCampos
], registro.modificar);


router.delete('/eliminar/:id',[  
    validarJWT,
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdUsuario),
    validarCampos
],registro.eliminar)


export default router