import mongoose from "mongoose";


const Schema = mongoose.Schema;

const RegisUsuSchema = new Schema({

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
        default: 'USUARIO',
        emun: ['ADMINISTRADOR_ROLE', 'USUARIO']
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
    pais:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pais',
    },
    ciudad:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pais',
    },
    municipio:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Municipio',
    },
});


RegisUsuSchema.methods.toJSON = function () {
    const { __v, password, _id, ...RegisUsu } = this.toObject();
    RegisUsu.iud = _id;
    return RegisUsu;
  };
  
export default mongoose.model('RegisUsu', RegisUsuSchema);
