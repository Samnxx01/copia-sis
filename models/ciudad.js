import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CiudadSchema = new Schema({

    ciudad: {
        type: String,
    }, 
    nombre_ciudad:  {
        type: String,
        required: [true, 'El nombre de la ciudad es obligatorio'],
    },

});


export default mongoose.model('Ciudad', CiudadSchema);