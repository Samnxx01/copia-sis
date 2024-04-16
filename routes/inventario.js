//Aqui iran todas la rutas del sistema de inventario
import express from 'express';
import{ check } from'express-validator';
import CompuController from '../controllers/computadores.js'
import ImpresoraController from '../controllers/impreso.js'
import RegisController from '../controllers/RegiUsu.js'
import { emailExiste, esRoleValidTecnico, esRoleValidoCoordinador, existeIdImpresoras, nombreExiste, nombreExisteSerial } from '../helpers/db-validators.js';
import LoginController from '../controllers/loginUsu.js'
import validarCampos from '../middlewares/validar.campos.js';
import cargarArchivoDB from '../controllers/uploads-uros.js'
import validarJWT from '../middlewares/validar-jwt-uros.js';
import validarJWTU from '../middlewares/validar-jwt-uros.js';
import subir from '../controllers/uploads-uros.js'
import { esTecnico } from '../middlewares/validar-roles.js';
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

//api de subir archivo 

router.post('/subirarchivos', subir.cargarArchivo )
router.post('/subirarchivosuros', subir.cargarArchivoDB )


//api de computadores de listar
 
//api de impresoras de listarID

router.get('/listarID/:serial',[

], ImpresoraController.listarImpresoraID)

//api api de computadores

router.get('/listarimpresoras',[

], ImpresoraController.listarImpresora)


//api de impresoras de listar

router.get('/listarcompu',[

], CompuController.listarCompu)


router.post('/guardarimpresoras',[
    validarJWTU,
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

//api de guardar computadores
router.post('/guardarComputador',[
    check('fecha','la fecha es obligatorio').not().isEmpty(),
    check('sede','la sede es obligatorio').not().isEmpty(),
    check('ubicacion','la ubicacion es obligatorio').not().isEmpty(),
    check('area','el area es obligatorio').not().isEmpty(),
    check('marca','la marca es obligatorio').not().isEmpty(),
    check('nombre_equipo','el nombre del equipo es obligatorio').not().isEmpty(),
    check('sistema_operativo','el sistema operativo es obligatorio').not().isEmpty(),
    check('placa','la placa es obligatorio').not().isEmpty(),
    check('disco_duro','el disco duro es obligatorio').not().isEmpty(),
    check('memoria_ram','la memoeria ram es obligatorio').not().isEmpty(),
    check('serial','El serial no se puede repetir').custom(nombreExisteSerial),
    check('ip','la ip es obligatorio').not().isEmpty(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('clave','la clave es obligatorio').not().isEmpty(),
    check('nombre_asignado','la nombre  es obligatorio').not().isEmpty(),
    check('cedula','la cedula es obligatorio').not().isEmpty(),
    check('dominio','el dominio es obligatorio').not().isEmpty(),
    check('mac','la mac es obligatorio').not().isEmpty(),
    check('fecha_mantenimiento', 'la fecha de mantimiento es obligatorio' ).not().isEmpty(),
    check('tecnico','la fecha es obligatorio').not().isEmpty(),
    check('observaciones','la observacion es obligatorio').not().isEmpty(),  
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos

], CompuController.guadarComputador)






router.put('/modificarImpresoras/:id',[
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
], ImpresoraController.modificarImpresora);

router.delete('/eliminarImpresoras/:id',[
    
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdImpresoras),
    validarCampos

], ImpresoraController.eliminarImpresora)

export default router