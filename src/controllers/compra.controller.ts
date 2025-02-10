import { Request, Response } from 'express';
import { Compra } from '../models/compra.model';
import { Articulo } from '../models/articulo.model';


export const getCompras = async (req: Request, res: Response) => {
    try {
        const compras = await Compra.find().populate('articulos.articulo').populate('proveedor'); // Populate para mostrar info de artículos y proveedor
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener compras', error });
    }
};

export const createCompra = async (req: Request, res: Response) => {
    try {
        const { articulos, proveedor, fecha } = req.body;

        // 1. Validar datos de entrada
        if (!articulos || articulos.length === 0) {
            return res.status(400).json({ message: 'Debe seleccionar al menos un artículo.' });
        }

        if (!proveedor) {
            return res.status(400).json({ message: 'Debe especificar el proveedor.' });
        }

        // 2. Calcular total y validar stock
        let total = 0;
        for (const item of articulos) {
            const articulo = await Articulo.findById(item.articulo);
            if (!articulo) {
                return res.status(400).json({ message: `El artículo con ID ${item.articulo} no existe.` });
            }

            // Validación de stock
            if (articulo.cantidad < item.cantidad) {
                return res.status(400).json({ message: `No hay suficiente stock del artículo ${articulo.nombre}.` });
            }

            total += articulo.precio * item.cantidad;
            articulo.cantidad -= item.cantidad; // Actualizar stock
            await articulo.save(); // Guardar cambios en el artículo
        }

        // 3. Crear la compra
        const nuevaCompra = new Compra({
            fecha: fecha || new Date(),
            total,
            articulos,
            proveedor,
        });

        // 4. Guardar la compra
        await nuevaCompra.save();

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

        // Actualizar la compra
        const compraActualizada = await Compra.findByIdAndUpdate(id, req.body, { new: true });      

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

        await Compra.findByIdAndDelete(id);
        res.json({ message: 'Compra eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar compra', error });
    }
};
