import { Request, Response } from 'express';
import { Inventario } from '../models/inventario.model';

// Obtener inventario con detalles de los artículos
export const getInventario = async (req: Request, res: Response) => {
    try {
        const inventario = await Inventario.find().populate('articulo');
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener inventario', error });
    }
};

// Modificar manualmente el inventario (Ejemplo: ajuste de stock)
export const updateInventario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const inventarioActualizado = await Inventario.findByIdAndUpdate(id, req.body, { new: true });
        if (!inventarioActualizado) return res.status(404).json({ message: 'Inventario no encontrado' });
        res.json(inventarioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar inventario', error });
    }
};
