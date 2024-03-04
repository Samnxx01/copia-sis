import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FacturaSchema = new Schema({

        nickname: {
            type: String,
            required: [true, 'El nickname es obligatorio']
        },
        correo: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true
        },
        telefono: {
            type: Number, // Cambiar el tipo de dato a Number
            required: [true, 'El teléfono es obligatorio']
        },
        direccion: {
            type: String,
            required: [true, 'La direccion es obligatoria']
        },
        regisUsu: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'RegisUsu'
        },
});

export default mongoose.model('Factura', FacturaSchema);