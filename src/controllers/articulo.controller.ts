import { Request, Response } from 'express';
import { Articulo } from '../models/articulo.model';

// Obtener todos los artículos
export const getArticulos = async (req: Request, res: Response) => {
    try {
        const articulos = await Articulo.find();
        res.json(articulos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener artículos', error });
    }
};

// Obtener un artículo por ID
export const getArticuloById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const articulo = await Articulo.findById(id);
        if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.json(articulo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener artículo', error });
    }
};

// Crear un nuevo artículo
export const createArticulo = async (req: Request, res: Response) => {
    try {
        const nuevoArticulo = new Articulo(req.body);
        await nuevoArticulo.save();
        res.status(201).json(nuevoArticulo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear artículo', error });
    }
};

// Actualizar un artículo
export const updateArticulo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const articuloActualizado = await Articulo.findByIdAndUpdate(id, req.body, { new: true });
        if (!articuloActualizado) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.json(articuloActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar artículo', error });
    }
};

// Eliminar un artículo
export const deleteArticulo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const articuloEliminado = await Articulo.findByIdAndDelete(id);
        if (!articuloEliminado) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.json({ message: 'Artículo eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar artículo', error });
    }
};
