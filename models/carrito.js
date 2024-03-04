import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CarritoSchema = new Schema({
    /*nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },*/
    productos:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: String,
    },
    total:{
        type: Number,
    }



});

CarritoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
  };
  

export default mongoose.model('Carrito', CarritoSchema);