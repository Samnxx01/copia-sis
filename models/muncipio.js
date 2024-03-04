import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MunicipioSchema = new Schema({

    municipio: {
        type: String,
    }, 

    nombre_municipio: {
        type: String,
    }, 

    postal: {
        type: Number,
        required: [true, 'El codigo postal es obligatorio'],
        unique: true
    }
});


export default mongoose.model('Municipio', MunicipioSchema);