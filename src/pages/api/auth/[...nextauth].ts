import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../../lib/mongodb';
import {compare} from 'bcryptjs';
import Staff from '@/Models/Staff';

export default NextAuth({

    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, email, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize (credentials: { email: string , password: string }) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const client = await clientPromise;
                const db = client.db("project-opener");
                const user = await db.collection<Staff>("staff").findOne({ 
                    email: credentials?.email }).then(async (user) => {
                        if (!user) {
                            throw new Error('No user found')
                        }
                        const isValid = await compare(credentials?.password, user.password);
                        if (!isValid) {
                            throw new Error("Invalid Password");
                        }
                        return user;
                    });
                if (user) {
                    return user;
                } else {
                    return null;
                }               
                 
            }
        })
    ],
    pages : {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user as Staff;
            session.user = user

            return session
        }
    }
});