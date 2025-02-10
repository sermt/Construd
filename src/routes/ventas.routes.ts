import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getVentas, createVenta, updateVenta, deleteVenta } from '../controllers/ventas.controller';

const router = Router();

// Todas las rutas requieren token válido
router.use(verifyToken);

router.get('/', getVentas);
router.post('/', createVenta);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);

export default router;
