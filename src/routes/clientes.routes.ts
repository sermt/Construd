import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../controllers/clientes.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getClientes);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;
