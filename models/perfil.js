import mongoose from "mongoose";


const Schema = mongoose.Schema;

const PerfilSchema = new Schema({

    nickname: {
        type: String,
        required: [true, 'El nickname es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    telefono: {
        type: Number, // Cambiar el tipo de dato a Number
        required: [true, 'El teléfono es obligatorio']
    },
});



export default mongoose.model('Perfil', PerfilSchema);
