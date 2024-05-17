import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArchivosSubidosSchema = new Schema({

    img: {
        type: String,
        
      },
});

export default mongoose.model('ArchivosSubidos', ArchivosSubidosSchema);