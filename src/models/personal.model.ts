import { Schema, model, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const PersonalSchema = new Schema(
  {
    nombreCompleto: { type: String, required: true, trim: true },
    fechaNacimiento: { type: Date, default: null },
    curp: { type: String, select: false, default: null, trim: true },
    rfc: { type: String, select: false, default: null, trim: true },
    correoElectronico: {
      type: String,
      match: /.+\@.+\..+/,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
    },
    telefonoMovil: { type: String, default: null, trim: true },
    puesto: { type: String, required: true, default: null, trim: true },
    departamento: { type: String, default: 'Sin departamento', trim: true },
    fechaContratacion: { type: Date, default: null },
    salario: { type: Number, default: null },
    tipoContrato: { type: String, default: null, trim: true },
    rol: {
      type: String,
      enum: ['empleado', 'lider', 'admin'],
      required: true,
      default: 'empleado',
    },
    nombreUsuario: { type: String, unique: true, required: true, trim: true },
    contrasena: { type: String, required: true, select: false },
    confirmarContrasena: { type: String, select: false }, 
    activo: { type: Boolean, default: true },
    fechaUltimoAcceso: { type: Date, default: null },
    numeroSeguridadSocial: { type: String, required: true, trim: true },
    contactoEmergencia: { type: String, required: true, trim: true },
    notas: { type: String, default: null, trim: true },
    resetPasswordToken: { type: String, select: false, default: null },
    resetPasswordExpires: { type: Date, select: false, default: null },
    fechaUltimoCambioContrasena: { type: Date, default: null },
  },
  { timestamps: true }
);

// Pre-save hook: valida que la contraseña y la confirmación coincidan y hashea la contraseña
PersonalSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();

  if (this.get('contrasena') !== this.get('confirmarContrasena')) {
    return next(new Error('Passwords do not match'));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    // Elimina confirmarContrasena para que no se guarde en la BD
    this.set('confirmarContrasena', undefined);
    next();
  } catch (err) {
    return next(err as CallbackError);
  }
});

// Pre-update hook: en caso de actualizar la contraseña, se valida y hashea
PersonalSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as { contrasena?: string; confirmarContrasena?: string };
  if (update?.contrasena) {
    if (update.contrasena !== update.confirmarContrasena) {
      return next(new Error('Passwords do not match'));
    }
    try {
      const salt = await bcrypt.genSalt(10);
      update.contrasena = await bcrypt.hash(update.contrasena, salt);
      delete update.confirmarContrasena;
    } catch (err) {
      return next(err as CallbackError);
    }
  }
  next();
});

// Método para comparar contraseñas (para el login)
PersonalSchema.methods.comparePassword = async function (candidatePassword: string) {
  const user = await Personal.findById(this._id).select('+contrasena');
  if (!user) return false;
  return bcrypt.compare(candidatePassword, user.contrasena);
};

// Método para generar un token de restablecimiento de contraseña
PersonalSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // Expira en 1 hora
  return resetToken;
};

// Método para actualizar la fecha de último acceso
PersonalSchema.methods.updateLastLogin = async function () {
  this.fechaUltimoAcceso = new Date();
  await this.save();
};

// Índices para mejorar búsquedas
PersonalSchema.index({ nombreUsuario: 1 });
PersonalSchema.index({ correoElectronico: 1 });

export const Personal = model('Personal', PersonalSchema);
