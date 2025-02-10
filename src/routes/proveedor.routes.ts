import express from 'express';
import {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from '../controllers/proveedor.controller'; // Importa las funciones del controlador
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.use(verifyToken);

// Rutas para proveedores
router.get('/', getProveedores); // GET /api/proveedores - Obtener todos los proveedores
router.get('/:id', getProveedorById); // GET /api/proveedores/:id - Obtener un proveedor por ID
router.post('/', createProveedor); // POST /api/proveedores - Crear un nuevo proveedor
router.put('/:id', updateProveedor); // PUT /api/proveedores/:id - Actualizar un proveedor
router.delete('/:id', deleteProveedor); // DELETE /api/proveedores/:id - Eliminar un proveedor

export default router;