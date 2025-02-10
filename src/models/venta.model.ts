import { Schema, model } from 'mongoose';


const VentaSchema = new Schema({
    fecha: { type: Date, required: true },
    total: { type: Number, required: true }, 
    articulos: [{
        articulo: { type: Schema.Types.ObjectId, ref: 'Articulo', required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true }  
    }],
    vendedor: { type: Schema.Types.ObjectId, ref: 'Personal', required: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' }, 
    metodo_pago: { type: String, required: true } 
}, { timestamps: true });

export const Venta = model('Venta', VentaSchema);
