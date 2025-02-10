import { Request, Response } from 'express';
import { Venta } from '../models/venta.model';

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
        // Se espera recibir en el body:
        // fecha, total, articulos (arreglo de { producto, cantidad, precio }),
        // vendedor (id de Personal), cliente (id de Cliente o undefined) y metodo_pago.
        const nuevaVenta = new Venta(req.body);
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear venta', error });
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
