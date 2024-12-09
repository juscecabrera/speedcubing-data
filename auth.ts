import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { connectToDB } from './utils/database'
import User from './models/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ profile }) {
            try {
                await connectToDB();
    
                const userExists = await User.findOne({
                    email: profile?.email
                });
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        password: undefined,
                        // username: profile.name.replace(' ', '').toLowerCase(),
                        // image: profile.picture,
                        country: "USA",
                        sessions: []
                    })
                }
    
                return true;
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})