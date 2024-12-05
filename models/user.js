import { Schema, model, models } from 'mongoose';

const sessionSchema = new Schema({
  _id: {
    type: String,  // Identificador único de sesión
    default: Schema.Types.ObjectId  // Genera un ID único si no se proporciona
  },
  userId: {
    type: String,
    default: Schema.Types.ObjectId  // ID del usuario
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  solves: {
    type: Array, 
    default: [] 
  }
});

// Crear y exportar el modelo
const Session = models.Session || model('Session', sessionSchema);

export default Session;
