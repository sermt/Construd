import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getInventario, updateInventario } from '../controllers/inventario.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getInventario);
router.put('/:id', updateInventario);

export default router;
