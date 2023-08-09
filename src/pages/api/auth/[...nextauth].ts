import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";
import { compare } from "bcryptjs";
import Staff from "@/Models/Staff";
import { User } from "next-auth";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const client = await clientPromise;
        const db = client.db("project-opener");
        const user = await db
          .collection<Staff>("staff")
          .findOne({
            email: credentials?.email,
          })
          .then(async (user) => {
            if (!user) {
              throw new Error("No user found");
            }
            const isValid = await compare(credentials?.password, user.password);
            if (!isValid) {
              throw new Error("Invalid Password");
            }
            return user;
          });
        if (user) {
          // Map properties from Staff to create a User object
          const mappedUser: User = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }; 
          return mappedUser;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user;
      session.user = user as User;

      return session;
    },
  },
});
