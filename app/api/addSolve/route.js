import { connectToDB } from '../../../utils/database';
import Session from '../../../models/session';

export const POST = async (req) => {
  try {
    const { solveTime, scramble, date, sessionId } = await req.json();

    if (!solveTime || !scramble || !date) {
      return new Response(JSON.stringify({ error: 'Datos incompletos' }), { status: 400 });
    }

    await connectToDB();

    let existingSession = await Session.findById(sessionId);

    //esto es para primeros usuarios: se les creara una primera sesion vacia, asi siempre va a haber por lo menos una sesion en el usuario 
    if (!existingSession) {
      existingSession = new Session({ solves: [] });
    }
    existingSession.solves.push({solveTime, scramble, date});

    await existingSession.save();
    
    return new Response((existingSession), { status: 200 });
  
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor', details: error.message }), { status: 500 });

  }
};
