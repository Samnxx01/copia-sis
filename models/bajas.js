import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BajasSchema = new Schema({
    
        numero_bajas: {
            type: Number,
            required: [true, 'ingrese el consencutivo de bajas']
        },
        tipo_parte: {
            type: String,
            required: [true, 'El tipo_parte es obligatoria']
        },
        serial_parte: {
            type: String,
            required: [true, 'El serial_parte es obligatoria']
        },
        diagnostico: {
            type: String,
            required: [true, 'El diagnostico es obligatoria']
        },
        estado: {
            type: Boolean,
            default: true
        },
});

export default mongoose.model('BajasEquipo', BajasSchema);