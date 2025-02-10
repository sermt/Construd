import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getCompras, createCompra, updateCompra, deleteCompra } from '../controllers/compra.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getCompras);
router.post('/', createCompra);
router.put('/:id', updateCompra);
router.delete('/:id', deleteCompra);

export default router;
