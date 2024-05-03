//Aqui iran todas la rutas del sistema de inventario
import express from 'express';
import { check } from 'express-validator';
import CompuController from '../controllers/computadores.js'
import ImpresoraController from '../controllers/impreso.js'
import RegisController from '../controllers/RegiUsu.js'
import { emailExiste, esRoleValidTecnico, esRoleValidoCoordinador, existeIdBajass, existeIdComputadores, existeIdImpresoras, existeIdUsuarioUros, nombreExiste, nombreExisteReportes, nombreExisteSerial } from '../helpers/db-validators.js';
import LoginController from '../controllers/loginUsu.js'
import validarCampos from '../middlewares/validar.campos.js';
import cargarArchivoDB from '../controllers/uploads-uros.js'
import validarJWT from '../middlewares/validar-jwt-uros.js';
import validarJWTU from '../middlewares/validar-jwt-uros.js';
import subir from '../controllers/uploads-uros.js'
import { esTecnico } from '../middlewares/validar-roles.js';
import reportesController from '../controllers/reportes.js'
import bajasController from '../controllers/bajas.js'
//rutas para computadores 



var router = express.Router()


//Rutas de registro tecnico 
router.post('/registro/tecnico', [

    check('nickname', 'El nickname es obligatorio').not().isEmpty(),
    check('nickname',).custom(nombreExiste),
    check('correo', 'correo no es valido').isEmail(),
    check('correo',).custom(emailExiste),
    check('password', 'contraseña no es valido').isLength({ min: 6 }),
    check('telefono', ' El telefono es obligatorio').not().isEmpty(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol',).custom(esRoleValidTecnico),
    validarCampos
], RegisController.guardarTenico)

//Rutas de registro coordinador
router.post('/registro/coordinador', [
    check('nickname', 'El nickname es obligatorio').not().isEmpty(),
    check('nickname',).custom(nombreExiste),
    check('correo', 'correo no es valido').isEmail(),
    check('correo',).custom(emailExiste),
    check('password', 'contraseña no es valido').isLength({ min: 6 }),
    check('telefono', ' El telefono es obligatorio').not().isEmpty(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol',).custom(esRoleValidTecnico),
    validarCampos
], RegisController.guardarCoordinador)

//Rutas de login
router.post('/login/tecnico', [

    check('correo', 'correo no es valido').isEmail(),
    check('password', 'contraseña no es valido').isLength({ min: 6 }),
    //check('rol', ).custom( esRoleValidTecnico )
    validarCampos
], LoginController.guardarTecnico)



//obtener categorias - admin
//router.get('/listar/usuario')

//api de subir archivo 

router.post('/subirarchivos', subir.cargarArchivo)
router.post('/subirarchivosuros', subir.cargarArchivoDB)


//api de reportes


//api de impresoras de listarID

router.get('/listarID/:serial', [

], ImpresoraController.listarImpresoraID)


router.get('/listarIP/:ip', [

], ImpresoraController.listarImpresoraIP)

//api de buscar computadores
router.get('/compu/listarID/:serial', [

], CompuController.listarComputadoresID)


router.get('/compu/listarIP/:ip', [

], CompuController.listarComputadoresIP)

//api api de computadores

router.get('/listarimpresoras', [

], ImpresoraController.listarImpresora)

router.get('/listarBajas', [

], bajasController.listarBajas)


//api de impresoras de listar

router.get('/listarcompu', [

], CompuController.listarCompu)


router.post('/guardarimpresoras', [

    check('sedes', 'la sede es obligatorio').not().isEmpty(),
    check('pisos', 'el piso es obligatorio').not().isEmpty(),
    check('ip', 'la ip es obligatorio').not().isEmpty(),
    check('serial', 'La serial no se puede repetir').custom(nombreExisteSerial),
    check('mac', 'la mac es obligatorio').not().isEmpty(),
    check('marca', 'la marca es obligatorio').not().isEmpty(),
    check('contador',).not().isEmpty(),
    check('fecha', 'la fecha es obligatorio').not().isEmpty(),
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos

], ImpresoraController.guadarImpresora)

//api de guardar computadores
router.post('/guardarComputador', [
    check('fecha', 'la fecha es obligatorio').not().isEmpty(),
    check('sede', 'la sede es obligatorio').not().isEmpty(),
    check('ubicacion', 'la ubicacion es obligatorio').not().isEmpty(),
    check('area', 'el area es obligatorio').not().isEmpty(),
    check('marca', 'la marca es obligatorio').not().isEmpty(),
    check('nombre_equipo', 'el nombre del equipo es obligatorio').not().isEmpty(),
    check('sistema_operativo', 'el sistema operativo es obligatorio').not().isEmpty(),
    check('placa', 'la placa es obligatorio').not().isEmpty(),
    check('disco_duro', 'el disco duro es obligatorio').not().isEmpty(),
    check('memoria_ram', 'la memoeria ram es obligatorio').not().isEmpty(),
    check('serial', 'El serial no se puede repetir').custom(nombreExisteSerial),
    check('ip', 'la ip es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('clave', 'la clave es obligatorio').not().isEmpty(),
    check('nombre_asignado', 'la nombre  es obligatorio').not().isEmpty(),
    check('cedula', 'la cedula es obligatorio').not().isEmpty(),
    check('dominio', 'el dominio es obligatorio').not().isEmpty(),
    check('mac', 'la mac es obligatorio').not().isEmpty(),
    check('fecha_mantenimiento', 'la fecha de mantimiento es obligatorio').not().isEmpty(),
    check('tecnico', 'la fecha es obligatorio').not().isEmpty(),
    check('observaciones', 'la observacion es obligatorio').not().isEmpty(),
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos

], CompuController.guadarComputador)

router.put('/modificarComputadora/:id', [

    //check('categoria', 'no es un id mongo').isMongoId(),
], CompuController.modificarCompu);
//api de bajas
router.post('/guardarbajas', [
    check('numero_bajas', 'ingrese el numero de bajas').not().isEmpty(),
    check('tipo_parte', 'cual parte es').not().isEmpty(),
    check('serial_parte', 'ingrese el serial').not().isEmpty(),
    check('diagnostico', 'escriba la observacion').not().isEmpty(),
], bajasController.guadarbajas)


router.delete('/eliminarComputadora/:id', [

    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id',).custom(existeIdComputadores),
    validarCampos

], CompuController.eliminarComputadora)



/*router.post('/guardarComputador', [
    check('fecha', 'la fecha es obligatorio').not().isEmpty(),
    check('sede', 'la sede es obligatorio').not().isEmpty(),
    check('ubicacion', 'la ubicacion es obligatorio').not().isEmpty(),
    check('area', 'el area es obligatorio').not().isEmpty(),
    check('marca', 'la marca es obligatorio').not().isEmpty(),
    check('nombre_equipo', 'el nombre del equipo es obligatorio').not().isEmpty(),
    check('sistema_operativo', 'el sistema operativo es obligatorio').not().isEmpty(),
    check('placa', 'la placa es obligatorio').not().isEmpty(),
    check('disco_duro', 'el disco duro es obligatorio').not().isEmpty(),
    check('memoria_ram', 'la memoeria ram es obligatorio').not().isEmpty(),
    check('serial', 'El serial no se puede repetir').custom(nombreExisteSerial),
    check('ip', 'la ip es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('clave', 'la clave es obligatorio').not().isEmpty(),
    check('nombre_asignado', 'la nombre  es obligatorio').not().isEmpty(),
    check('cedula', 'la cedula es obligatorio').not().isEmpty(),
    check('dominio', 'el dominio es obligatorio').not().isEmpty(),
    check('mac', 'la mac es obligatorio').not().isEmpty(),
    check('fecha_mantenimiento', 'la fecha de mantimiento es obligatorio').not().isEmpty(),
    check('tecnico', 'la fecha es obligatorio').not().isEmpty(),
    check('observaciones', 'la observacion es obligatorio').not().isEmpty(),
    //check('categoria', 'no es un id mongo').isMongoId(),
    validarCampos

], CompuController.guadarComputador)*/

//api de reportes
router.post('/guardarReportes', [

    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
    check('numero_caso', 'El numero caso no se puede repetir').not().isEmpty(),
    check('impresoras', 'no es un id impresoras mongo').isMongoId(),
    check('impresoras').custom(existeIdImpresoras),
    check('registUros', 'no es un id UROS mongo').isMongoId(),
    check('registUros').custom(existeIdUsuarioUros),
    check('computadores', 'no es un id computadores mongo').isMongoId(),
    check('computadores').custom(existeIdComputadores),
    check('marca', 'La marca es obligatorio').not().isEmpty(),
    check('modelo', 'el modelo es obligatorio').not().isEmpty(),
    check('serial_parte', 'el serial de la parte obligatorio').not().isEmpty(),
    check('tipo_parte', 'La parte es obligatorio').not().isEmpty(),
    check('fecha_instalacion', 'la fecha de instalacion es obligatorio').not().isEmpty(),
    check('equipo_garantia', 'la garantia de instalacion es obligatorio').not().isEmpty(),
    check('bajas', 'no es un id categoria mongo').isMongoId(),
    check('bajas').custom(existeIdBajass),

    //check('nombre', ).custom(nombreExisteProduc),
    validarCampos
], reportesController.guadarReportes)

router.get('/listar', [

], reportesController.listarReporte)



router.put('/modificarImpresoras/:id', [

    //check('categoria', 'no es un id mongo').isMongoId(),
], ImpresoraController.modificarImpresora);

router.delete('/eliminarImpresoras/:id', [

    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id',).custom(existeIdImpresoras),
    validarCampos

], ImpresoraController.eliminarImpresora)


export default router