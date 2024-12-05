import { connectToDB } from '../../../utils/database';
import Session from '../../../models/user';

export const POST = async (req) => {
  const { userId, solveTime, scramble, date } = await req.json();
  
  try {
    await connectToDB();

    let existingSession = await Session.findOne({ userId });

    if (!existingSession) {
      existingSession = new Session({
        userId,
        solves: [], // Inicializa el array vacío
      });
    }
    existingSession.solves.push([solveTime, scramble, date]);
    console.log(existingSession)

    await existingSession.save();

    return new Response(JSON.stringify(existingSession), { status: 200 });
  } catch (error) {
    // console.error('Error al guardar la sesión:', error);  // Log detallado
    return new Response(JSON.stringify({ error: 'Error interno del servidor', details: error.message }), { status: 500 });
  }
};
