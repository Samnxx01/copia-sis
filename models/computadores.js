import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompuSchema = new Schema({

        sede: {
            type: String,
            required: [true, 'La sede es obligatorio']
        },
        ubicacion: {
            type: String,
            required: [true, 'La ubicacion es obligatorio'],
            unique: true
        },
        area: {
            type: Number, // Cambiar el tipo de dato a Number
            required: [true, 'El area es obligatorio']
        },
        marca: {
            type: String,
            required: [true, 'La marca es obligatoria']
        },
        nombre_equipo: {
            type: String,
            required: [true, 'La nombre_equipo es obligatoria']
        },
        sistema_operativo: {
            type: String,
            required: [true, 'La sistema operativo es obligatoria']
        },
        placa: {
            type: String,
            required: [true, 'El numero es obligatoria']
        },
        disco_duro: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        memoria_ram: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        serial: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        mac: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        ip: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        usuario: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        clave: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        nombre_asignado: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        dominio: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        estado: {
            type: Boolean,
            default: true
        },

});

export default mongoose.model('Compu', CompuSchema);