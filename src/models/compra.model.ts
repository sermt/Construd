import { Schema, model } from 'mongoose';

const CompraSchema = new Schema({
    fecha: { type: Date, required: true },
    total: { type: Number, required: true },
    articulos: [{
        articulo: { type: Schema.Types.ObjectId, ref: 'Articulo', required: true }, // Referencia a Articulo
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true }
    }],
    responsable: { type: Schema.Types.ObjectId, ref: 'Personal', required: true } // Quién compró
}, {
    timestamps: true
});

export const Compra = model('Compra', CompraSchema);
