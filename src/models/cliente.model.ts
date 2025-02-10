import { Schema, model } from 'mongoose';

const ClienteSchema = new Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    direccion: { type: String, required: true }
}, {
    timestamps: true
});

export const Cliente = model('Cliente', ClienteSchema);
