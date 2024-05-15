import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const subirArchivoUros = (files, extensionValidas = ['csv', 'xlsx', 'pdf', 'png', 'jpeg', 'jpg'], carpeta = '') => {
    return new Promise((resolve, reject) => {

        
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extensión permitida
        if (!extensionValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida. Extensiones permitidas: ${extensionValidas.join(', ')}`);   
        }
        

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../db-uros/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreTemp);
        });
    });
};

export default subirArchivoUros;
