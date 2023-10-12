import express from 'express';
import{ check } from'express-validator'
import validarCampos from '../middlewares/validar.campos.js';
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
import controllerProductos from '../controllers/productos.js'
import {esAdminRole} from '../middlewares/validar-roles.js';
import {existeIdCategoria, existeIdProduc} from '../helpers/db-validators.js';
import {nombreExisteProduc} from '../helpers/db-validators.js'

var router = express.Router()


//obtener categorias - admin
router.get('/listar/admin',[
    validarJWT,
    esAdminRole
], controllerProductos.listarProducto)

//obtener categorias - usuario
router.get('/listar',[
    validarJWT,
    
], controllerProductos.listarProducto)

//listar por id
router.get('/listar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdProduc),
    validarCampos
    
], controllerProductos.listarProductoID)


//crear categorias - cualquier adminsitador valido
router.post('/guardar',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    //check('nombre', ).custom(nombreExisteProduc),
    check('categoria', 'no es un id categoria mongo').isMongoId(),
    check('categoria').custom(existeIdCategoria),
    validarCampos
], controllerProductos.guadarProducto) 

//crear categorias sin azucar - cualquier adminsitador valido
/*router.post('/guardarcategoria/sinazucar/admin',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('nombre', ).custom(nombreExisteCate),
    check('sinazucar', ).custom( azucarValido),
    validarCampos
], controllerCategorias.guadarCategoria) 

*/




router.put('/modificar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre', ).custom( nombreExisteProduc),
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdCategoria),
    check('id').custom( existeIdProduc),
    validarCampos,
], controllerProductos.modificarProducto);

router.delete('/eliminar/:id',[  
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id', ).custom( existeIdProduc),
    validarCampos,
], controllerProductos.eliminarProducto,)

export default router