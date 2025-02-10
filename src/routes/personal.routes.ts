import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { getPersonal, createPersonal, updatePersonal, deletePersonal } from '../controllers/personal.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getPersonal);
router.post('/', createPersonal);
router.put('/:id', updatePersonal);
router.delete('/:id', deletePersonal);

export default router;
