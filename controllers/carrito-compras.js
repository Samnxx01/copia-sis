import { response } from 'express';
import carritos from '../models/carrito.js';
import products from '../models/productos.js';






var carritoCompra = {
  
       guadarCarrito: async (req, res = response) => {
        const { nombre,  precio, cantidad } = req.body;
        const {id } = req.params

        try {
            // Verificar si el producto existe en la base de datos
            const productoEnProductos = await products.findById(id);
            console.log(productoEnProductos)
    
            if (!productoEnProductos) {
                return res.status(400).json({
                    msg: 'Este producto no se encuentra en la base de datos'
                });
            }
    
            const estanEnCarrito = await carritos.findOne({ nombre, cantidad });
   
            if (!estanEnCarrito) {
                // Crear un nuevo objeto de carrito
                const carritoInse = new carritos({
                    nombre,
                    cantidad,
                    precio
                });
    
                // Guardar el objeto de carrito en la base de datos
                await carritoInse.save();
    
                // Marcar el producto como "en el carrito" en la base de datos de productos
                await products.findByIdAndUpdate(
                    productoEnProductos._id,
                    { inCart: true },
                    { new: true }
                );
    
                res.json({
                    msg: 'El producto fue agregado al carrito',
                    carrito: carritoInse
                });
            } else {
                res.json({
                    msg: 'El producto ya está en el carrito'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Error al agregar el producto al carrito' });
        }
    }
 

 
 };
 
 
 export default carritoCompra;
 