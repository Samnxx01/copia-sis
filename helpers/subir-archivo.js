
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const subirArchivos = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'mp4'], carpeta = '', ) => {
    return new Promise((resolve, reject) => {
        
        const { imagen } = files;
        const nombreCortado = imagen.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar las extensiones
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida. Extensiones permitidas: ${extensionesValidas.join(', ')}`);
        }

        const nombreExtension = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '..', 'img-subida',carpeta, nombreExtension);

        imagen.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreExtension);
        });
    });
};

export default subirArchivos;
