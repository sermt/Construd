import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Validación dummy: en producción se debe validar el usuario y contraseña (por ejemplo, consultando una BD)
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", {
      expiresIn: "12h",
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
};
