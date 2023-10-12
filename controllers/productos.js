import { response } from 'express';
import Productosss   from '../models/productos.js';


var productoss = {
  

   listarProducto: async (req, res = response) => {
    try {
      // Obtiene todos los registros de la colección
      const id = req.params.id
      const query = {estado : true}

      const registros = await Productosss.find(query, id)
      .populate('regisUsu', 'nickname')
      .populate('categoria', 'nombre');
    
      const total = await Productosss.countDocuments(query)
      
     
      // Envía los registros como respuesta en formato JSON
      res.status(200).json({
          msg: 'Listado Exitoso',
          total,
          registros,
         
      });
  } catch (error) {
      console.error('Error en la operación:', error);
      res.status(500).json({
          error: 'Hubo un error en la operación',
      });
  }
},

listarProductoID: async (req, res = response) => {
      try {
            const { id } = req.params;

    
            // Busca el registro por ID
            
            const verificarPro = await Productosss.findById(id)
            .populate('regisUsu', 'nickname')
            .populate('categoria', 'nombre');
            
    
            if (!verificarPro) {
                return res.status(404).json({ msg: 'Registro no encontrado' });
            }
    
            res.status(200).json({
                msg: 'Usuario por ID Exitoso',
                verificarPro
            });
        } catch (error) {
            console.error("Error en la operación:", error);
    
            res.status(500).json({
                error: "Hubo un error en la operación"
            });
        }
},


    guadarProducto: async (req, res = response) => {
      const {estado, regisUsu, ...body} =req.body

      const productoDB = await Productosss.findOne({nombre: body.nombre});
      


      if (productoDB) {
        return res.status(400).json({
          msg: `la categoria ${productoDB.nombre}. ya existe`
        })
      }
      
      
      
      const data ={
        ...body,
        nombre: body.nombre.toUpperCase(),
  
        regisUsu: req.registrosUsu._id
      }



      const producto = await new Productosss(data)
      await producto.save();
      
      res.status(201).json({
        msg: 'Producto creado Exitoso',
        producto
      });
    },

    modificarProducto: async (req, res = response) => {
      const {id} = req.params
      const {estado,regisUsu, ...data} = req.body;
 
      /*if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
      }*/
      
      data.regisUsu = req.registrosUsu._id;
      const productos = await Productosss.findByIdAndUpdate(id, data ,{new:true})
      .populate('regisUsu', 'nickname')
      .populate('categoria', 'nombre');

      res.status(200).json({
        msg:'Modificacion Exitosa',
        productos
      })
    },

    eliminarProducto: async (req, res = response) => {
      const {id} = req.params;
      const productosBorrada = await Productosss.findByIdAndUpdate( id,{estado: false, disponible:false},{new: true})
      console.log(productosBorrada)
      res.status(200).json({
        msg: "Eliminado exitoso",
      })
    }

};


export default productoss;
