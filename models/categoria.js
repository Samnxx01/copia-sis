import mongoose from "mongoose";


const Schema = mongoose.Schema;

const categoriaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nickname es obligatorio'],
        unique:true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    regisUsu:{
        type: Schema.Types.ObjectId,
        ref: 'RegisUsu',
        required: true
    }

});


  
export default mongoose.model('categoria', categoriaSchema);
