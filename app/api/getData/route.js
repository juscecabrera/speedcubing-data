import { connectToDB } from '../../../utils/database'
import Session from '../../../models/user';

export const GET = async (req) => {
    try {
        await connectToDB();

        // const sessionData = await Session.findOne('user123')
        // if (!sessionData) return new Response('Session not found', {status: 404})

        const sessionData  = [[12.00]]
        return new Response(JSON.stringify(sessionData), { status: 200 })

    } catch (error) {
        return new Response({ status: 500 })
    }
}