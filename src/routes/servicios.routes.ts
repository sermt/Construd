import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getServicios, createServicio, updateServicio, deleteServicio } from '../controllers/servicios.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getServicios);
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.delete('/:id', deleteServicio);

export default router;
