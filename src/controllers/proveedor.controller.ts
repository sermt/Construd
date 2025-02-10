import { Request, Response } from 'express';
import  Proveedor  from '../models/proveedor.model';

export const getProveedores = async (req: Request, res: Response) => {
    try {
        const empleados = await Proveedor.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener personal', error });
    }
};

export const getProveedorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const empleado = await Proveedor.findById(id);
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleado', error });
    }
};

export const createProveedor = async (req: Request, res: Response) => {
    try {
        const nuevoEmpleado = new Proveedor(req.body);
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear empleado', error });
    }
};

export const updateProveedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const empleadoActualizado = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });
        if (!empleadoActualizado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json(empleadoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar empleado', error });
    }
};

export const deleteProveedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const empleadoEliminado = await Proveedor.findByIdAndDelete(id);
        if (!empleadoEliminado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.json({ message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empleado', error });
    }
};
