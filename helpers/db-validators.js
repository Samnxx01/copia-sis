import Role from '../models/role.js'
import Regis from '../models/regiUsu.js'
import IdUsu from '../models/regiUsu.js'
import Categoria   from '../models/categoria.js';
import CategoriaAzucar   from '../models/categoriaAzucar.js';
import productos from '../models/productos.js';
import ciudad from '../models/ciudad.js';
import pais from '../models/pais.js';
import muncipio from '../models/muncipio.js';
import departamentosModels from '../models/departamentosModels.js';
import Impresorasss from '../models/impresoras.js'



export  async function esRoleValido(rol = 'USUARIO') {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol  no está registrado en la base de datos`);
    }
}
export  async function esRoleValidoAdmin(rol = 'ADMINISTRADOR_ROLE') {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol  no está registrado en la base de datos`);
    }
}
/*export async function esRoleValidoAmbos(rol = 'TECNICO') {
    const rolesValidos = ['TECNICO', 'COORDINADOR'];
    const existeRole = await Role.findOne({ rol: { $in: rolesValidos } });
    if (!existeRole) {
      throw new Error(`El rol  no está registrado en la base de datos`);
    }
  }*/
  
export  async function esRoleValidTecnico(rol = 'TECNICO') {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol  no está registrado en la base de datos`);
    }
}
export  async function esRoleValidoCoordinador(rol = 'COORDINADOR') {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol  no está registrado en la base de datos`);
    }
}
/*export  async function esRoleValidoAdmin(rol = 'ADMINISTRADOR_ROLE') {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol  no está registrado en la base de datos`);
    }
}*/
export  async function azucarValido(sinazucar = '') {
    const existeAzucar = await CategoriaAzucar.findOne({ sinazucar });
    if (!existeAzucar) {
        throw new Error(`la categoria  no está registrado sin azucar en la base de datos`);
    }
}




export async function emailExiste(correo = '') {
    const existeEmail = await Regis.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo  ya existe`);
    }
}

export async function nombreExiste(nickname = '') {
    const nombreExiste = await Regis.findOne({ nickname });
    if (nombreExiste) {
        throw new Error(`El nombre  ya existe`);
    }
}
export async function nombreExisteCate(nombre = '') {
    const nombreExiste = await Categoria.findOne({ nombre });
    if (nombreExiste) {
        throw new Error(`El nombre  ya existe`);
    }
}
export async function nombreExisteSerial(serial = '') {
    const nombreExiste = await Impresorasss.findOne({ serial });
    if (nombreExiste) {
        throw new Error(`El serial  ya existe`);
    }
}

export async function nombreExisteProduc(nombre = '') {
    const nombreExiste = await productos.findOne({ nombre });
    if (nombreExiste) {
        throw new Error(`El nombre  ya existe`);
    }
}







export async function existeIdCiudad(id) {
    const Existeciudad = await ciudad.findById(id);
    // Si no se encuentra el usuario, simplemente retornamos false en lugar de lanzar un error
    return !!Existeciudad;
}
export async function existeIdMunicipio(id) {
    const Existeciudad = await muncipio.findById(id);
    // Si no se encuentra el usuario, simplemente retornamos false en lugar de lanzar un error
    return !!Existeciudad;
}
export async function existeIdImpresoras(id) {
    const ExisteImpresora = await Impresorasss.findById(id);
    // Si no se encuentra el usuario, simplemente retornamos false en lugar de lanzar un error
    return !!ExisteImpresora;
}


export async function existeIdUsuario(id) {
    const existeUsuario = await IdUsu.findById(id);
    // Si no se encuentra el usuario, simplemente retornamos false en lugar de lanzar un error
    return !!existeUsuario;
}
export async function existeIdDepar(id) {
    const existeUsuario = await departamentosModels.findById(id);
    // Si no se encuentra el usuario, simplemente retornamos false en lugar de lanzar un error
    return !!existeUsuario;
}
export async function existeIdCategoria(id) {
    const existeUsuario = await Categoria.findById(id);
    // Si no se encuentra el categoria, simplemente retornamos false en lugar de lanzar un error
    return !!existeUsuario;
}
export async function existeIdPais(id) {
    const existeUsuario = await pais.findById(id);
    // Si no se encuentra el categoria, simplemente retornamos false en lugar de lanzar un error
    return !!existeUsuario;
}

export async function existeIdProduc(id) {
    const existeUsuario = await productos.findById(id);
    // Si no se encuentra el producto, simplemente retornamos false en lugar de lanzar un error
    return !!existeUsuario;
}
export async function coleccionesPermitidas(coleccion = '', colecciones = []) {
    
    const incluida = colecciones.includes(coleccion); // Corregir "incluides" a "includes"
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida. Colecciones permitidas: ${colecciones}`)
    }
    return true;
    // Si no se encuentra la colección, simplemente retornamos false en lugar de lanzar un error
}



