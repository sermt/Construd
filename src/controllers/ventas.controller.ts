import { Request, Response } from 'express';
import { Venta } from '../models/venta.model';
import { Articulo } from '../models/articulo.model';

export const getVentas = async (req: Request, res: Response) => {
    try {
        const ventas = await Venta.find();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ventas', error });
    }
};

export const createVenta = async (req: Request, res: Response) => {
    try {
        const { articulos, vendedor, cliente, metodo_pago } = req.body;
        
        const fecha = new Date(); 
        
        // 1. Validar los datos de entrada
        if (!articulos || articulos.length === 0) {
            return res.status(400).json({ message: 'Debe seleccionar al menos un artículo.' });
        }

        if (!vendedor) {
            return res.status(400).json({ message: 'Debe especificar el vendedor.' });
        }

        if (!metodo_pago) {
            return res.status(400).json({ message: 'Debe especificar el metodo de pago.' });
        }

        let total = 0;
        for (const item of articulos) {
            const articulo = await Articulo.findById(item.articulo);
            if (!articulo) {
                return res.status(400).json({ message: `El artículo con ID ${item.articulo} no existe.` });
            }
            total += articulo.precio * item.cantidad;
            item.precio = articulo.precio; // Guardar el precio al momento de la venta
        }

        // 3. Crear la venta
        const nuevaVenta = new Venta({
            fecha,
            total,
            articulos,
            vendedor,
            cliente,
            metodo_pago // O puedes recibir el método de pago desde el frontend
        });

        // 4. Guardar la venta
        await nuevaVenta.save();

        // 5. Actualizar el inventario
        for (const item of nuevaVenta.articulos) {
            await Articulo.findByIdAndUpdate(item.articulo, { $inc: { stock: -item.cantidad } });
        }

        res.status(201).json(nuevaVenta);
    } catch (error) {
        // ... (manejo de errores)
    }
};

export const updateVenta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ventaActualizada = await Venta.findByIdAndUpdate(id, req.body, { new: true });
        if (!ventaActualizada) return res.status(404).json({ message: 'Venta no encontrada' });
        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar venta', error });
    }
};

export const deleteVenta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ventaEliminada = await Venta.findByIdAndDelete(id);
        if (!ventaEliminada) return res.status(404).json({ message: 'Venta no encontrada' });
        res.json({ message: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar venta', error });
    }
};
