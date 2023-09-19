import express from 'express';
import{ check } from'express-validator';
import loginController from '../controllers/loginUsu.js'
import validarCampos from '../middlewares/validar.campos.js';
import { esAdminRole } from '../middlewares/validar-roles.js';
import validarJWT from '../middlewares/validar-jwt-seguridad.js';

var router = express.Router()



router.get('/listar', loginController.listar )

router.post('/login/admin',[
    
    check('correo','el correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController.guardarAdmin)

router.post('/login/usuario',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController.guardar)


router.post('/google',[
    check('id_token','id_token es obligatorio').not().isEmpty(),
    validarCampos
], loginController.googleSingIn)

export default router