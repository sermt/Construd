import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getArticulos, getArticuloById, createArticulo, updateArticulo, deleteArticulo } from '../controllers/articulo.controller';

const router = Router();

// Aplicar middleware de autenticación
router.use(verifyToken);

router.get('/', getArticulos);
router.get('/:id', getArticuloById);
router.post('/', createArticulo);
router.put('/:id', updateArticulo);
router.delete('/:id', deleteArticulo);

export default router;
