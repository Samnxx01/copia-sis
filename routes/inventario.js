//Aqui iran todas la rutas del sistema de inventario
import express from 'express';
import{ check } from'express-validator';
import CompuController from '../controllers/computadores.js'
import ImpresoraController from '../controllers/impreso.js'
import RegisController from '../controllers/RegiUsu.js'
import { emailExiste, esRoleValidTecnico, esRoleValidoCoordinador, existeIdImpresoras, nombreExiste, nombreExisteSerial } from '../helpers/db-validators.js';
import LoginController from '../controllers/loginUsu.js'
import validarCampos from '../middlewares/validar.campos.js';
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
//rutas para computadores 



var router = express.Router()


//Rutas de registro tecnico 
router.post('/registro/tecnico',[

check('nickname', 'El nickname es obligatorio').not().isEmpty(),
check('nickname', ).custom( nombreExiste),
check('correo', 'correo no es valido').isEmail(),
check('correo', ).custom( emailExiste),
check('password', 'contraseña no es valido').isLength({ min: 6}),
check('telefono', ' El telefono es obligatorio').not().isEmpty(),
//check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
check('rol', ).custom( esRoleValidTecnico),
validarCampos
] ,RegisController.guardarTenico)

//Rutas de registro coordinador
router.post('/registro/coordinador',[
    check('nickname', 'El nickname es obligatorio').not().isEmpty(),
    check('nickname', ).custom( nombreExiste),
    check('correo', 'correo no es valido').isEmail(),
    check('correo', ).custom( emailExiste),
    check('password', 'contraseña no es valido').isLength({ min: 6}),
    check('telefono', ' El telefono es obligatorio').not().isEmpty(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol', ).custom( esRoleValidTecnico),
    validarCampos
    ] ,RegisController.guardarCoordinador)

//Rutas de login
router.post('/login/tecnico',[
check('correo', 'correo no es valido').isEmail(),
check('password', 'contraseña no es valido').isLength({ min: 6}),
//check('rol', ).custom( esRoleValidTecnico ),
validarCampos
], LoginController.guardarTecnico)



//obtener categorias - admin
router.get('/listar/usuario')

//


//api de computadores de listar
 


//api de impresoras de listar

router.get('/listarimpresoras',[

], ImpresoraController.listarImpresora)


router.post('/guardarimpresoras',[
    check('sedes','la sede es obligatorio').not().isEmpty(),
    check('pisos','el piso es obligatorio').not().isEmpty(),
    check('ip','la ip es obligatorio').not().isEmpty(),
    check('serial','La serial no se puede repetir').custom(nombreExisteSerial),
    check('mac','la mac es obligatorio').not().isEmpty(),
    check('marca','la marca es obligatorio').not().isEmpty(),
    check('contador', ).not().isEmpty(),
    check('fecha','la fecha es obligatorio').not().isEmpty(),   
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos

], ImpresoraController.guadarImpresora)





router.put('/modificarImpresoras/:id',[
], ImpresoraController.modificarImpresora);

router.delete('/eliminarImpresoras/:id',[
    
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdImpresoras),
    validarCampos

], ImpresoraController.eliminarImpresora)

export default router