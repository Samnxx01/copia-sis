import { response } from 'express';
import categoriass from '../models/categoria.js';

var categorias = {

   listarCategoria: async (req, res = response) => {
      try {
        const categorias = await categoriass.find();
        res.status(200).json({ 
          msg: 'listando los registros', categorias
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
},


    guadarCategoria: async (req, res = response) => {
      const nombre = req.body.nombre.toUpperCase();
      const categoriaDB = await categoriass.findOne({nombre});

      if (!categoriaDB) {
        return res.status(400).json({
          msg: `la categoria ${categoriaDB.nombre}. ya existe`
        })
      }
      const data ={
        nombre,
        regisUsu: req.regisUsu._id
      }

      const categoria = await new categoriass(data)

      await categoria.save();
      res.status(201).json(categoria);
    }


};


export default categorias;
