import { connectToDB } from '../../../utils/database'
import Session from '../../../models/session';
import User from '../../../models/user';

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
        // const { sessionName } = await req.json();
        const sessionName = 'Session 2'
        let userIdExample = "675739548a187c96fb2854bd"

        await connectToDB();

        let newSession = sessionName ? new Session({name: sessionName, solves: []}) : new Session({ solves: [] });

        await newSession.save();

        const user = await User.findById(userIdExample);

        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
      
        user.sessions.push(newSession._id);
    
        await user.save();
    
        return new Response(JSON.stringify(newSession._id.toString()), { status: 200 });
        
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}