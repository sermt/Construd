import { Schema, model } from 'mongoose';

const ServicioSchema = new Schema({
    tipo: { type: String, required: true },
    costo: { type: Number, required: true }
}, {
    timestamps: true
});

export const Servicio = model('Servicio', ServicioSchema);
