import express from 'express';
import{ check } from'express-validator';
import validarCampos from '../middlewares/validar.campos.js';
import controllerCategorias from '../controllers/categoria.js'
import {esAdminRole} from '../middlewares/validar-roles.js';




import validarJWT from '../middlewares/validar-jwt-seguridad.js';

var router = express.Router()


//obtener categorias - publico
router.get('/categorias/listar', controllerCategorias.listarCategoria)


//crear categorias - cualquier adminsitador valido
router.post('/auth/guardarcategoria',[
    validarJWT,
    esAdminRole,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
], controllerCategorias.guadarCategoria) 



//obtener categorias - publico por id
/*router.get('/categorias/listar/:id', controllerCategorias.listarCategoria)*/



/*router.put('/auth/modificar/:id',[
    validarJWT,
    //esTenerRoles('USUARIO','ADMINISTRADOR_ROLE'),
    esAdminRole,
    //esta pendiente el id que me arroje la modificacion 
    check('id', 'No es un ID valido').isMongoId(),
    check('rol', ).custom( esRoleValido),
    validarCampos
], loginController.modificar);

router.delete('categorias/eliminar/:id',[  

],)*/


export default router