import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ComentarioProsSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },    
    estado: {
        type: Boolean,
        default: true
    },

    regisUsu: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'RegisUsu'
    },
    descripcion:{type:String},


});

export default mongoose.model('ComentarioPros', ComentarioProsSchema);