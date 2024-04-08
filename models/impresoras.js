import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImpresorasSchema = new Schema({

        sedes: {
            type: String,
            required: [true, 'La sede es obligatorio']
        },
        pisos: {
            type: String,
            required: [true, 'El piso es obligatorio'],
            unique: true
        },
        ip: {
            type: String, // Cambiar el tipo de dato a Number
            required: [true, 'La ip es requerida']
        },
        serial: {
            type: String,
            required: [true, 'La serial es obligatoria'],
            unique: true
        },
        mac: {
            type: String,
            required: [true, 'La mac es obligatoria']
        },
        marca: {
            type: String,
            required: [true, 'La marca es obligatoria']
        },
        ubicacion: {
            type: String,
            required: [true, 'La ubicacio es obligatoria']
        },
        contador: {
            type: Number,
            required: [true, 'El numero de pagina es obligatoria']
        },
        fecha: {
            type: String,
            required: [true, 'La fecha es obligatoria']
        },
        estado: {
            type: Boolean,
            default: true
        },


});

export default mongoose.model('Impresoras', ImpresorasSchema);