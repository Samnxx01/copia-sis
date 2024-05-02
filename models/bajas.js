import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BajasSchema = new Schema({
    
        numero_bajas: {
            type: Number,
            required: [true, 'ingrese el consencutivo de bajas']
        },
        tipo_parte: {
            type: String,
            required: [true, 'La marca es obligatoria']
        },
        serial_parte: {
            type: String,
            required: [true, 'La marca es obligatoria']
        },
        diagnostico: {
            type: String,
            required: [true, 'La marca es obligatoria']
        },
});

export default mongoose.model('BajasEquipo', BajasSchema);