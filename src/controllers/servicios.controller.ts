import { Request, Response } from 'express';
import { Servicio } from '../models/servicio.model';

export const getServicios = async (req: Request, res: Response) => {
    try {
        const servicios = await Servicio.find();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener servicios', error });
    }
};

export const createServicio = async (req: Request, res: Response) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        await nuevoServicio.save();
        res.status(201).json(nuevoServicio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear servicio', error });
    }
};

export const updateServicio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const servicioActualizado = await Servicio.findByIdAndUpdate(id, req.body, { new: true });
        if (!servicioActualizado) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json(servicioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar servicio', error });
    }
};

export const deleteServicio = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const servicioEliminado = await Servicio.findByIdAndDelete(id);
        if (!servicioEliminado) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json({ message: 'Servicio eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar servicio', error });
    }
};
