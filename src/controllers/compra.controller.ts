import { Request, Response } from 'express';
import { Compra } from '../models/compra.model';
import { Inventario } from '../models/inventario.model';

// Función para actualizar el inventario después de una compra
const actualizarInventario = async (articuloId: string, cantidad: number) => {
    const inventario = await Inventario.findOne({ articulo: articuloId });

    if (inventario) {
        inventario.cantidad += cantidad;
        await inventario.save();
    } else {
        await Inventario.create({ articulo: articuloId, cantidad });
    }
};

// Obtener todas las compras con detalles de artículos y responsables
export const getCompras = async (req: Request, res: Response) => {
    try {
        const compras = await Compra.find()
            .populate('articulos.articulo', 'nombre precio descripcion')
            .populate('responsable', 'nombre puesto');
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener compras', error });
    }
};

// Crear una compra y actualizar inventario
export const createCompra = async (req: Request, res: Response) => {
    try {
        const nuevaCompra = new Compra(req.body);
        await nuevaCompra.save();

        // Actualizar inventario por cada artículo comprado
        for (const item of nuevaCompra.articulos) {
            await actualizarInventario(item.articulo.toString(), item.cantidad);
        }

        res.status(201).json(nuevaCompra);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear compra', error });
    }
};

// Modificar una compra y actualizar inventario
export const updateCompra = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const compraAnterior = await Compra.findById(id);
        if (!compraAnterior) return res.status(404).json({ message: 'Compra no encontrada' });

        // Revertir inventario de la compra anterior
        for (const item of compraAnterior.articulos) {
            await actualizarInventario(item.articulo.toString(), -item.cantidad);
        }

        // Actualizar la compra
        const compraActualizada = await Compra.findByIdAndUpdate(id, req.body, { new: true });

        // Actualizar inventario con los nuevos valores
        for (const item of compraActualizada!.articulos) {
            await actualizarInventario(item.articulo.toString(), item.cantidad);
        }

        res.json(compraActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar compra', error });
    }
};

// Eliminar una compra y descontar del inventario
export const deleteCompra = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findById(id);
        if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });

        // Revertir inventario
        for (const item of compra.articulos) {
            await actualizarInventario(item.articulo.toString(), -item.cantidad);
        }

        await Compra.findByIdAndDelete(id);
        res.json({ message: 'Compra eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar compra', error });
    }
};
