import { Schema, model } from 'mongoose';

const InventarioSchema = new Schema({
    articulo: { type: Schema.Types.ObjectId, ref: 'Articulo', required: true },
    cantidad: { type: Number, required: true }
}, {
    timestamps: true
});

export const Inventario = model('Inventario', InventarioSchema);
