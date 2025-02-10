import { Schema, model } from 'mongoose';

const ArticuloSchema = new Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true }, 
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true }, 
    unidad: { type: String },
    categoria: { type: String },
    proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor' },
    imagenes: [{ type: String }] 
}, { timestamps: true });

export const Articulo = model('Articulo', ArticuloSchema);
