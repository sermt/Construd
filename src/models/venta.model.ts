import { Schema, model } from 'mongoose';

const ArticuloSchema = new Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
});

const VentaSchema = new Schema({
    fecha: { type: Date, required: true },
    total: { type: Number, required: true },
    articulos: { type: [ArticuloSchema], required: true },
    // El id del personal (vendedor) que realiza la venta
    vendedor: { type: Schema.Types.ObjectId, ref: 'Personal', required: true },
    // El id del cliente, opcional si no está registrado
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', default: undefined },
    metodo_pago: { type: String, required: true }
}, {
    timestamps: true
});

export const Venta = model('Venta', VentaSchema);
