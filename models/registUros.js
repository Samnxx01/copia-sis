import mongoose from "mongoose";


const Schema = mongoose.Schema;

const RegistUrosSchema = new Schema({

    nickname: {
        type: String,
        required: [true, 'El nickname es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    telefono: {
        type: Number,
        required: [true, 'El telefono es obligatoria']
    },
    img: {
        type: String,
    },
    
    rol: {
        type: String,
        required: true,
        default: 'TECNICO',
        emun: ['TECNICO', 'COORDINADOR']
    },
    
    estado: {
        type: Boolean,
        default: true
    },
    tiempoSesion: {
        type: Date,
        default: null
    },
    google: {
        type: Boolean,
        default: false
    },
});


RegistUrosSchema.methods.toJSON = function () {
    const { __v, password, _id, ...RegistUros } = this.toObject();
    RegistUros.iud = _id;
    return RegistUros;
  };
  
export default mongoose.model('RegistUros', RegistUrosSchema);
