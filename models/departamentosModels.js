import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DepartaSchema = new Schema({

    departamento:{
        type: String,
        required: [true, 'El departamneto es obligatorio'],
    },
    
    nombre_departamento: {
        type: String,
        required: [true, 'El departamneto es obligatorio'],
    },   
    region: {
        type: String,
        required: [true, 'El departamento es obligatorio'],
    },  
});


export default mongoose.model('Depar', DepartaSchema);