import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },    
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
    regisUsu: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'RegisUsu'
    },
    precio:{
        type: Number,
        default: true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },
    descripcion:{type:String},
    disponible:{type:Boolean, default: true}

});

ProductosSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
  };
  

export default mongoose.model('Producto', ProductosSchema);