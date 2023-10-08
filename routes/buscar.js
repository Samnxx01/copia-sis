import express from 'express';
import{ check } from'express-validator';
import validarCampos from '../middlewares/validar.campos.js';
import controllerCategorias from '../controllers/categoria.js'



import validarJWT from '../middlewares/validar-jwt-seguridad.js';

var router = express.Router()


//obtener categorias - admin
router.get('/listar',[
    validarJWT,
    esAdminRole
], controllerCategorias.listarCategoria)


export default router