import { connectToDB } from '../../../../../utils/database';
import User from '../../../../../models/user';

//GET DE SESSIONS DEL USUARIO
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        
        const userIdObject = await params
        
        const userEmail = userIdObject.userId

        const user = await User.findOne({ email: userEmail }).populate('sessions');
        if (!user) return new Response('User not found', {status: 404})
        
        return new Response(JSON.stringify(user.sessions), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}