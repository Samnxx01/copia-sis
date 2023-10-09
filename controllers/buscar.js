import { response } from 'express';
import { Types } from 'mongoose';
import busquedaU from '../models/regiUsu.js'

import busquedaC from '../models/categoria.js'
import busquedaP from '../models/productos.js'



//este controlador hacemos la busquedas por argumentos y colecciones
const { ObjectId } = Types;


const coleccionesPermitidasAdmin =[
    'regisUsu',
    'categorias',
    'productos'
]

const coleccionesPermitidasUsuario =[
    'categorias',
    'productos'
]

var buscarID = {


    buscarIDUsuario: async (termino = '', res = response) => {

        const esMongoID = ObjectId.isValid(termino); 

        if (esMongoID) {
            const BusquedaUsuario = await busquedaU.findById(termino);

            if (BusquedaUsuario) {
                return res.status(200).json({
                    msg: 'Búsqueda Exitosa de usuarios',
                    resultado: [BusquedaUsuario]
                });
            } else {
                return res.status(404).json({
                    msg: 'No se encontraron resultados'
                });
            }
        } else {
            const regex = new RegExp(termino, 'i');
            const BusquedaUsuario = await busquedaU.find({
                $or: [{ nickname: regex }, { correo: regex }],
                $and:[{estado:true}]
            });
    
            if (BusquedaUsuario.length > 0) {
                return res.status(200).json({
                    msg: 'Búsqueda Exitosa',
                    BusquedaUsuario
                });
            } else {
                return res.status(404).json({
                    msg: 'No se encontraron resultados'
                });
            }
           }
    },

   buscarIDCategoria: async (termino = '', res = response) => {

        const esMongoID = ObjectId.isValid(termino); 

        if (esMongoID) {
            const BusquedaCategoria = await busquedaC.findById(termino);

            if (BusquedaCategoria) {
                return res.status(200).json({
                    msg: 'Búsqueda Exitosa de categorias',
                    resultado: [BusquedaCategoria]
                });
            } else {
                return res.status(404).json({
                    msg: 'No se encontraron resultados'
                });
            }
        } else {
            const regex = new RegExp(termino, 'i');
            const BusquedaCategoria = await busquedaC.find({
                $or: [{ nombre: regex }, { referencia: regex }],
                $and:[{estado:true}]
            });
    
            if (BusquedaCategoria.length > 0) {
                return res.status(200).json({
                    msg: 'Búsqueda Exitosa',
                    BusquedaCategoria
                });
            } else {
                return res.status(404).json({
                    msg: 'No se encontraron resultados'
                });
            }
           }
    },
    
    buscarIDProducto: async (termino = '', res = response) => {

        const esMongoID = ObjectId.isValid(termino); 

        if (esMongoID) {
            const Productos = await busquedaP.findById(termino).populate('categoria', 'nombre')
            const disponible = await busquedaP.find({disponible:true})
                            
            if (Productos) {
                return res.status(200).json({
                    msg: 'Búsqueda Exitosa de usuarios',
                    disponible,
                    resultado: [Productos]
                });
            } else {
                return res.status(404).json({
                    msg: 'No se encontraron resultados'
                });
            }
        } else {
            const regex = new RegExp(termino, 'i');
            const Productos = await busquedaP.find({nombre:regex, disponible:true})
            .populate('categoria', 'nombre')
            .populate('regisUsu', 'nickname')
            
    
            if (Productos.length > 0) {
                return res.status(200).json({
                    msg: 'Búsqueda Exitosa',
                    Productos
                });
            } else {
                return res.status(404).json({
                    msg: 'No se encontraron resultados'
                });
            }
           }
    }
};


var buscar = {

    buscarAdmin: async (req,res = response) => {
        
        const {coleccion, termino} = req.params;

        if (!coleccionesPermitidasAdmin.includes(coleccion)) {
            return res.status(401).json({
                msg: `Busqueda no encontrada , ${coleccionesPermitidasAdmin}`
            })
            
        }
        
        switch (coleccion) {
            case 'regisUsu':
                    await buscarID.buscarIDUsuario(termino, res);                  
                break;

            case 'categorias':
                    await buscarID.buscarIDCategoria(termino, res);                  
                break;
            case 'productos':
                    await buscarID.buscarIDProducto(termino, res); 
                break;
        
            default:

        }
    },

    buscarUsu: async (req,res = response) => {
        
        const {coleccion, termino} = req.params;
        if (!coleccionesPermitidasUsuario.includes(coleccion)) {
            return res.status(401).json({
                msg: `Busqueda no encontrada , ${coleccionesPermitidasUsuario}`
            })
            
        }
        
        switch (coleccion) {
            case 'categorias':
                    await buscarID.buscarIDCategoria(termino, res);                  
                break;
            case 'productos':
                    await buscarID.buscarIDProducto(termino, res); 
                break;
        
            default:

        }
    },
  
  

  
};


export {buscar, buscarID};
