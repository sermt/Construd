import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/punto_venta';

mongoose.connect(MONGO_URI, {
    //useNewUrlParser: true,
   // useUnifiedTopology: true,
})
.then(() => {
    console.log("Base de datos MongoDB conectada");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
.catch((err) => {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1);
});
