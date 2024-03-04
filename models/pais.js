import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaisSchema = new Schema({

    pais_selecto: {
        type: String,
        required: [true, 'El pais es obligatorio'],
    },  
    nombre_pais: {
        type: String,
        required: [true, 'el nombre del pais es obligatorio'],
    },   
    departamento:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Depar'
    }],  
    ciudad:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Ciudad'
    }],
    municipio:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Municipio'
    }],
    
});


export default mongoose.model('Pais', PaisSchema);