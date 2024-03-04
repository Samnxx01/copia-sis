import express from 'express';
import{ check } from'express-validator'
import validarCampos from '../middlewares/validar.campos.js';
import validarJWT from '../middlewares/validar-jwt-seguridad.js';
import controllerPais from '../controllers/pais.js'
import ciudadController from '../controllers/ciudad.js'
import municipioController from '../controllers/municipio.js'
import deparController from '../controllers/departamento.js'
import { existeIdCiudad, existeIdMunicipio,existeIdDepar} from '../helpers/db-validators.js';


var router = express.Router()



//ruta de pais
router.post('/guardarPais/usuario',[
    check('pais_selecto', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre_pais', 'El nombre pais es obligatorio').not().isEmpty(),
    check('departamento', 'no es un id de mongo').isMongoId(),
    check('departamento').custom(existeIdDepar),
    check('ciudad', 'no es un id ciudad  mongo').isMongoId(),
    check('ciudad').custom(existeIdCiudad),
    check('municipio', 'no es un id municipio  mongo').isMongoId(),
    check('municipio').custom(existeIdMunicipio),
    validarCampos
], controllerPais.guardarPaisRu)

router.post('/guardarPais/invitado',[
    //validacion de campos
    check('nombre_pais', 'El nombre pais es obligatorio').not().isEmpty(),
    check('departamento', 'El Departamento es obligatorio').not().isEmpty(),
    validarCampos
], controllerPais.guardarPaisRu)


//ruta de municipio
router.post('/guardarMunicipio/invitado',[
    //validacion de campos
    check('municipio', 'El municipio pais es obligatorio').not().isEmpty(),
    check('nombre_municipio', 'El nombre pais es obligatorio').not().isEmpty(),
    validarCampos
], municipioController.guadarMunicipio)


router.get('/country/listarPais',[
    check('ciudad', 'El id no es valido').isMongoId(),
], controllerPais.listar)

//ruta de ciudad 
router.post('/guardarCiudad/usuario',[
    check('nombre_ciudad', 'El nombre ciudad es obligatorio').not().isEmpty(),
    check('ciudad', 'El nombre ciudad es obligatorio').not().isEmpty(),
    validarCampos
], ciudadController.guadarCiudad)

router.get('/ciudades/listarCiudad/',[
    //validacion de campos
], ciudadController.listarCiudadesPorPais)

router.post('/departamento/usuario',[
    check('departamento', 'El nombre ciudad es obligatorio').not().isEmpty(),
    check('nombre_departamento', 'El nombre ciudad es obligatorio').not().isEmpty(),
    check('region', 'El region es obligatorio').not().isEmpty(),
    validarCampos
], deparController.guadarDepartamento)




export default router