import { Schema, model } from 'mongoose';

const ArticuloSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true }
}, {
    timestamps: true
});

export const Articulo = model('Articulo', ArticuloSchema);
