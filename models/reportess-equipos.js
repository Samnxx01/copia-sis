import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReportesSchema = new Schema({
    
    fecha: {
        type: String,
        required: [true, 'La fecha y hora son obligatorias']
    },
    numero_caso: {
        type: Number,
        required: [true, 'El numero de pagina es obligatoria'], 
        unique: true
    },
    computadores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compu'
    },
    impresoras: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Impresoras'
    },
    registUros: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RegistUros'
    },
    marca: {
        type: String,
        required: [true, 'La mac es obligatoria']
    },
    modelo: {
        type: String,
        required: [true, 'La marca es obligatoria']
    },
    serial_parte: {
        type: String,
        required: [true, 'La ubicacio es obligatoria']
    },
    fecha_instalacion: {
        type: String,
        required: [true, 'El numero de pagina es obligatoria']
    },
    extension: {
        type: Number,
        required: [true, 'La fecha y hora son obligatorias']
    },
    estado: {
        type: Boolean,
        default: true
    },
    equipo_garantia: {
        type: String,
        required: [true, 'La fecha y hora son obligatorias']
    },
    bajas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BajasEquipo'
    },
});

export default mongoose.model('Reportes', ReportesSchema);