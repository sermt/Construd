import { Schema, model } from 'mongoose';

const ProveedorSchema = new Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String },
    direccion: { type: String },
    rfc: { type: String },
}, { timestamps: true });

export default model('Proveedor', ProveedorSchema);