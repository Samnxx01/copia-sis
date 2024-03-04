import express from 'express';
import{ check } from'express-validator'
import carritoController from '../controllers/carrito-compras.js'

var router = express.Router()


//obtener categorias - admin
router.get('/listar/admin')




//crear categorias - cualquier adminsitador valido
router.post('/guardarCarrito', carritoController.guadarCarrito) 






router.put('/modificar/:id');

router.delete('/eliminar/:id')

export default router