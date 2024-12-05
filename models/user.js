import { Schema, model, Types } from 'mongoose';

const sessionSchema = new Schema({
  _id: {
    type: String,  // Identificador único de sesión
    default: () => `session_${new Types.ObjectId()}`  // Genera un ID único si no se proporciona
  },
  userId: {
    type: String,
    required: true  // ID del usuario
  },
  createdAt: {
    type: Date,
    default: Date.now  // Fecha de creación de la sesión
  },
  solves: {
    type: Array,  // Almacena el array completo como un campo único
    default: []   // Inicia vacío por defecto
  }
});

// Crear y exportar el modelo
const Session = model('Session', sessionSchema);
export default Session;
