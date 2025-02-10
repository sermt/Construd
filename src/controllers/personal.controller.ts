import { Request, Response } from 'express';
import { Personal } from '../models/personal.model';

export const getPersonal = async (req: Request, res: Response) => {
    try {
        const empleados = await Personal.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener personal', error });
    }
};

export const createPersonal = async (req: Request, res: Response) => {
    try {
        const nuevoEmpleado = new Personal(req.body);
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear empleado', error });
    }
};

export const updatePersonal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const empleadoActualizado = await Personal.findByIdAndUpdate(id, req.body, { new: true });
        if (!empleadoActualizado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(empleadoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar empleado', error });
    }
};

export const deletePersonal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const empleadoEliminado = await Personal.findByIdAndDelete(id);
        if (!empleadoEliminado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json({ message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empleado', error });
    }
};
