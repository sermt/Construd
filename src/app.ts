import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

import authRouter from './routes/auth.routes';
import articuloRouter from './routes/articulo.routes';
import ventasRouter from './routes/ventas.routes';
import serviciosRouter from './routes/servicios.routes';
import inventarioRouter from './routes/inventario.routes';
import personalRouter from './routes/personal.routes';
import clientesRouter from './routes/clientes.routes';
import compraRouter from './routes/compra.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Middlewares de seguridad y utilitarios
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 solicitudes por IP
    message: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde."
});
app.use(limiter);

// Rutas públicas
app.use('/auth', authRouter);

// Rutas protegidas (se validan con JWT)
app.use('/ventas', ventasRouter);
app.use('/servicios', serviciosRouter);
app.use('/inventario', inventarioRouter);
app.use('/personal', personalRouter);
app.use('/clientes', clientesRouter);
app.use('/compras', compraRouter);
app.use('/articulos', articuloRouter);


// Manejador global de errores
app.use(errorHandler);

export default app;
