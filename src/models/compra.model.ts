import { Schema, model } from 'mongoose';

const CompraSchema = new Schema({
    fecha: { type: Date, required: true },
    total: { type: Number, required: true },
    articulos: [{
        articulo: { type: Schema.Types.ObjectId, ref: 'Articulo', required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true }
    }],
    proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor' }, 
    responsable: { type: Schema.Types.ObjectId, ref: 'Personal', required: true } 
}, {
    timestamps: true
});

export const Compra = model('Compra', CompraSchema);
