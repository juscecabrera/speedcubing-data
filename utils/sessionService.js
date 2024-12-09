import Session from '../models/session.js';  // Importa el modelo de sesión

export const getSessionSolves = async (userId) => {
  try {
    const session = await Session.findOne({ userId });  // Encuentra la sesión basada en el userId
    if (session) {
      return session.solves;  // Devuelve los solves
    } else {
      return [];  // Si no hay sesión, devuelve un array vacío
    }
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw new Error('Failed to fetch session data');
  }
};
