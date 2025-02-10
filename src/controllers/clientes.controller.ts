import { Request, Response } from 'express';
import { Cliente } from '../models/cliente.model';

export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes', error });
    }
};

export const createCliente = async (req: Request, res: Response) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente', error });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
        if (!clienteActualizado) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cliente', error });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const clienteEliminado = await Cliente.findByIdAndDelete(id);
        if (!clienteEliminado) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente', error });
    }
};
