import { connectToDB } from '../../../../utils/database';
import Session from '../../../../models/session';   

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const sessionId = await params

        const sessionIdObject = sessionId.id
        
        const sessionData = await Session.findById(sessionIdObject)
        if (!sessionData) return new Response('Session not found', {status: 404})

        return new Response(JSON.stringify(sessionData), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}