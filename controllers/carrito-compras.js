import { response } from 'express';
import carritos from '../models/carrito.js'






var carritoCompra = {
  
    guadarCarrito: async (req, res = response) => {
        const {cantidad, productos,  ...body} =req.body
  
        const productoDB = await carritos.findOne({nombre: body.nombre});
        
  
  
        if (productoDB) {
          return res.status(400).json({
            msg: `El producto al carro ${productoDB.nombre}. ya ya fue agregado`
          })
        }
        
        
        
        const data ={
          ...body,
          nombre: body.nombre.toUpperCase(),
    
          regisUsu: req.registrosUsu._id
        }
  
  
  
        const producto = await new carritos(data)
        await producto.save();
        
        res.status(201).json({
          msg: 'Producto creado Exitoso',
          producto
        });
      },
 

 
 };
 
 
 export default carritoCompra;
 