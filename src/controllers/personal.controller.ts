import { Request, Response } from "express";
import { Personal } from "../models/personal.model";
import { isValidObjectId } from "mongoose";

const handleControllerError = (
  res: Response,
  error: any,
  message = "Internal server error"
) => {
  console.error(error);
  return res
    .status(500)
    .json({ success: false, message, error: error.message });
};

// Create a new user
export const createPersonal = async (req: Request, res: Response) => {
  try {
    const personalData = req.body;

    // Validar campos requeridos
    const requiredFields = [
      "nombreCompleto",
      "puesto",
      "rol",
      "nombreUsuario",
      "contrasena",
      "confirmarContrasena",
      "numeroSeguridadSocial",
      "contactoEmergencia",
    ];
    for (const field of requiredFields) {
      if (!personalData[field]) {
        return res
          .status(400)
          .json({ success: false, message: `Field '${field}' is required.` });
      }
    }

    if (personalData.contrasena !== personalData.confirmarContrasena) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmation do not match.",
      });
    }

    const { confirmarContrasena, ...userDataToSave } = personalData;
    const newUser = new Personal({ ...userDataToSave, confirmarContrasena });
    const createdUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: createdUser,
    });
  } catch (error: any) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.nombreUsuario
    ) {
      return res.status(409).json({
        success: false,
        message: "Username already in use. Please choose another.",
      });
    }
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.correoElectronico
    ) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
    }
    return handleControllerError(res, error, "Error creating user.");
  }
};

// Update an existing user
export const updatePersonal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID." });
    }

    let personalData = req.body;
    // Si se proporciona la contraseña, validar que coincida con la confirmación
    if (personalData.contrasena || personalData.confirmarContrasena) {
      if (personalData.contrasena !== personalData.confirmarContrasena) {
        return res.status(400).json({
          success: false,
          message: "Password and confirmation do not match.",
        });
      }
    }

    const updatedPersonal = await Personal.findByIdAndUpdate(id, personalData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPersonal) {
      return res
        .status(404)
        .json({ success: false, message: "Personal not found." });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedPersonal,
    });
  } catch (error: any) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.nombreUsuario
    ) {
      return res.status(409).json({
        success: false,
        message: "Username already in use. Please choose another.",
      });
    }
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.correoElectronico
    ) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
    }
    return handleControllerError(res, error, "Error updating user.");
  }
};

// Soft delete a user (set active to false)
export const deactivatePersonal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID." });
    }

    const deactivatePersonal = await Personal.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );
    if (!deactivatePersonal) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully.",
      data: deactivatePersonal,
    });
  } catch (error: any) {
    return handleControllerError(res, error, "Error deactivating user.");
  }
};

// List all active users
export const listPersonal = async (_req: Request, res: Response) => {
  try {
    const users = await Personal.find({ activo: true }).select(
      "-contrasena -resetPasswordToken -resetPasswordExpires"
    );
    return res.status(200).json({
      success: true,
      message: "Active users retrieved successfully.",
      data: users,
    });
  } catch (error: any) {
    return handleControllerError(res, error, "Error listing users.");
  }
};

// Get a user by ID
export const getPersonalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID." });
    }

    const user = await Personal.findById(id)
      .where({ activo: true })
      .select("-contrasena -resetPasswordToken -resetPasswordExpires");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or inactive." });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (error: any) {
    return handleControllerError(res, error, "Error retrieving user by ID.");
  }
};
