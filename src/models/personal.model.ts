import { Schema, model } from 'mongoose';

const PersonalSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    salario: { type: Number, required: true },
    puesto: { type: String, required: true },
    numeroSeguridadSocial: { type: String, required: true },
    contactoEmergencia: { type: String, required: true }
}, {
    timestamps: true
});

export const Personal = model('Personal', PersonalSchema);
