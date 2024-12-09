import { connectToDB } from '../../../utils/database'
import Session from '../../../models/session';

export const GET = async (req) => {
    try {
        await connectToDB();
        let sessionIdExample = "67562cc1788b35b647c9a0fd"

        const sessionData = await Session.findOne({ sessionIdExample })
        if (!sessionData) return new Response('Session not found', {status: 404})

        // const sessionData  = [[12.00]]
        return new Response(JSON.stringify(sessionData), { status: 200 })

    } catch (error) {
        return new Response({ status: 500 })
    }
}