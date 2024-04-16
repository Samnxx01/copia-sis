import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArchivosSubidosSchema = new Schema({

    nombre: {
        type: String,
        
      },
      path: {
        type: String,
        
      },
      mimetype: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
});

export default mongoose.model('ArchivosSubidos', ArchivosSubidosSchema);