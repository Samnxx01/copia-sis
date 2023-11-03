import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CarritoSchema = new Schema({
    /*nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },*/
    regisUsu: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'regisUsu'
    },    
    estado: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: String,
    },



});

CarritoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
  };
  

export default mongoose.model('Carrito', CarritoSchema);