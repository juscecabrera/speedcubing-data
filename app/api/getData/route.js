import { connectToDB } from '../../../utils/database'
import Session from '../../../models/session';

export const GET = async () => {
    try {
        await connectToDB();
        let sessionIdExample = "67562cc1788b35b647c9a0fd"

        const sessionData = await Session.findOne({ sessionIdExample })
        if (!sessionData) return new Response('Session not found', {status: 404})

        return new Response(JSON.stringify(sessionData), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}

//CREAR SESION
export const POST = async (req) => {
    try {
        const { sessionName } = await req.json();

        await connectToDB();

        let newSession = sessionName ? new Session({name: sessionName, solves: []}) : new Session({ solves: [] });

        await newSession.save();
        
        return new Response(JSON.stringify(newSession._id.toString()), { status: 200 });
        
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}