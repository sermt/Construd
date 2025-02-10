import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/punto_venta";
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Tiempo máximo de espera
    });
    console.log("✅ Base de datos MongoDB conectada");

    // Iniciar el servidor solo después de conectar a la DB
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    setTimeout(connectDB, 5000); // Intentar reconectar después de 5 segundos
  }
};

// Manejo de errores en la conexión a MongoDB
mongoose.connection.on("error", (err) => {
  console.error("❗ Error en la conexión a MongoDB:", err);
});

// Si la conexión se cierra, intentar reconectar
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ Se perdió la conexión con MongoDB. Reintentando...");
  connectDB();
});

// Iniciar la conexión
connectDB();
