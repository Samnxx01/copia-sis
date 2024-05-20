 import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompuSchema = new Schema({

        fecha: {
            type: String,
            required: [true, 'La fecha es obligatoria']
        },
        sede: {
            type: String,
            required: [true, 'La sede es obligatorio']
        },
        ubicacion: {
            type: String,
            required: [true, 'La ubicacion es obligatorio'],
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
            required: [true, 'La placa es obligatoria'],
            unique: true
        },
        disco_duro: {
            type: String,
            required: [true, 'La disco duro es obligatoria']
        },
        memoria_ram: {
            type: String,
            required: [true, 'La memoria ram es obligatoria']
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
        ip: {
            type: String,
            required: [true, 'La ip es obligatoria']
        },
        usuario: {
            type: String,
            required: [true, 'El usuario es obligatoria']
        },
        clave: {
            type: String,
            required: [true, 'La clave es obligatoria']
        },
        img: {
            type: String,
        },
        nombre_asignado: {
            type: String,
            required: [true, 'El nombre asginado es obligatoria']
        },
        cedula: {
            type: Number,
            required: [true, 'El nombre asginado es obligatoria']
        },
        fecha_mantenimiento: {
            type: String,
            required: [true, 'La fecha es obligatoria']
        },
        tecnico: {
            type: String,
            required: [false, 'El nombre asginado es obligatoria']
        },
        dominio: {
            type: String,
            required: [true, 'EL dominio es obligatoria']
        },
        estado: {
            type: Boolean,
            default: true
        },
        observaciones: {
            type: String,
            required: [false, 'La observacion es obligatoria']
        },


});

export default mongoose.model('Compu', CompuSchema);