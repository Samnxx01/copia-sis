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
    nombre_usuario: {
        type: String,
        required: [true, 'el nombre son obligatorias']
    },
    cedula_usuario: {
        type: String,
        required: [true, 'el nombre son obligatorias']
    },
    correo_electronico_usuario: {
        type: String,
        required: [true, 'El correo es obligatoria'], 
    },
    area: {
        type: String,
    },
    extension_usua: {
        type: Number,
        required: [true, 'La fecha y hora son obligatorias']
    },
    nombre_ingeniero: {
        type: String,
        required: [true, 'el nombre son obligatorias']
    },
    correo_ing: {
        type: String,
        required: [true, 'el correo del ing son obligatorias']
    },
    extension_ing: {
        type: String,
        required: [true, 'La extension son obligatorias']
    },
    celular_ing: {
        type: Number,
        required: [true, 'el numero son obligatorias']
    },
    marca_dispositivos: {
        type: String,
        required: [true, 'La marca de impresora o computadores son obligatorias']
    },
    serial_dispositivo: {
        type: String,
        required: [true, 'el serial son obligatorias']
    },
    mac_dispositivos: {
        type: String,
        required: [true, 'La mac son obligatorias']
    },
    tipo_equipo: {
        type: String,
        required: [true, 'El tipo es obligatoria']
    },
    serial_equipo_baja: {
        type: String,
        required: [true, 'El serial equipo baja de baja obligatoria']
    },
    marca_instalado: {
        type: String,
        required: [true, 'La marca es obligatoria']
    },
    modelo_instalacion: {
        type: String,
        required: [true, 'La modelo instalacion es obligatoria']
    },
    serial_parte: {
        type: String,
        required: [true, 'La serial parte es obligatoria']
    },
    fecha_instalacion: {
        type: String,
        required: [true, 'la fecha es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    equipo_garantia: {
        type: String,
        required: [true, 'El equipo son obligatorias']
    },
    reporte_garantia: {
        type: String,
        required: [true, 'El reporte son obligatorias']
    },
    serial_garantia: {
        type: String,
        required: [true, 'EL serial son obligatorias']
    },
    diagnostico: {
        type: String,
        required: [true, 'El diagnostico es necesario']
    },
    coordinador_area: {
        type: String,
        required: [true, 'La firma es obligatoria']
    },
    activos_fijos: {
        type: String,
        required: [true, 'La firma es obligatoria']
    },
});

export default mongoose.model('Reportes', ReportesSchema);