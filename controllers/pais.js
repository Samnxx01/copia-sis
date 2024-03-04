import departamentosModels from '../models/departamentosModels.js';
import paisSelec from '../models/pais.js'
import ciudads from '../models/ciudad.js'
import municipios from '../models/muncipio.js'

let paises = {



      listar: async (req, res) => {
        try {
          const registrosPaises = await paisSelec.find()
          .populate('pais_selecto', 'pais')
          
          .populate('departamento', 'departamento')
          .populate('ciudad', 'ciudad')
          .populate('municipio', 'municipio');
          
          // Devolver un objeto con la clave "registro"
          res.status(200).json({
           registrosPaises,
          });
        } catch (error) {
          console.error('Error en la operación:', error);
          res.status(500).json({
            error: 'Hubo un error en la operación',
          });
        }
      },
    
  
      guardarPaisRu: async (req, res = response) => {
        const { pais_selecto, nombre_pais, departamento, ciudad, municipio } = req.body;
      
        try {
          let existePais = await paisSelec.findOne({ pais_selecto });
      
          if (!existePais) {
            // Si el país no existe, crear un nuevo país
            existePais = new paisSelec({
              pais_selecto: pais_selecto.toUpperCase(),
              nombre_pais: nombre_pais.toUpperCase(),
            });
            await existePais.save();
          }
      
          // Verificar si la ciudad ya está asociada con ese país
          const existeCiudad = await ciudads.findById(ciudad);
          if (existeCiudad) {
            // Verificar si la ciudad ya está asociada con este país
            const ciudadEnPais = existePais.ciudad.find(c => c.toString() === ciudad);
            if (ciudadEnPais) {
              return res.status(400).json({
                msg: 'La ciudad ya está asociada con este país',
              });
            }
            // Asociar la ciudad al país existente
            existePais.ciudad.push(existeCiudad);
          }
      
          const existeDepartamento = await departamentosModels.findById(departamento);
          if (!existeDepartamento) {
            // Verificar si el departamento ya está asociado con este país
            const departamentoEnPais = existePais.departamento.find(c => c.toString() === departamento);
            if (departamentoEnPais) {
              return res.status(400).json({
                msg: 'La ciudad ya está asociada con este país',
              });
            }
            // Asociar el departamento al país existente
            existePais.departamento.push(existeDepartamento);
          }
      
          const existeMunicipio = await municipios.findById(municipio);
          if (!existeMunicipio) {
            // Verificar si el municipio ya está asociado con este país
            const municipioEnPais = await municipios.findOne({ _id: municipio, pais: existePais._id });
            if (municipioEnPais) {
              return res.status(400).json({
                msg: 'El municipio ya está asociado con este país',
              });
            }
            // Asociar el municipio al país existente
            existePais.municipio.push(existeMunicipio);
          }
      
          // Guardar los cambios en el país existente
          await existePais.save();
      
          res.status(200).json({
            msg: 'País y Departamentos Registrados',
            registro: existePais,
          });
        } catch (error) {
          console.error('Error en la operación:', error);
          res.status(500).json({ error: 'Hubo un error en la operación' });
        }
      },
      
      
      
  
        eliminarPerfil: async (req, res = response) => {
          const {nickcname, telefono, ...body} =req.body
        
          const data ={
            ...body,
            nombre: body.nickcname,
      
            regisUsu: req.registrosUsu._id
          }
    
    
    
          const producto = await new perfilInfo(data)
          await producto.save();
          
          res.status(201).json({
            msg: 'Perfil Actualizado',
            producto
          });
        },
  
        modificarPerfil: async (req, res = response) => {
          const {nickcname, telefono, ...body} =req.body
        
          const data ={
            ...body,
            nombre: body.nickcname,
      
            regisUsu: req.registrosUsu._id
          }
    
    
    
          const producto = await new perfilInfo(data)
          await producto.save();
          
          res.status(201).json({
            msg: 'Perfil Actualizado',
            producto
          });
        },
    
  }
  
  export default paises;
  