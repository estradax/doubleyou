import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
	email: { type: 'email' },
	password: { type: 'password' }
      },
      async authorize(credentials, req) {
	return {
	  id: '1',
	  name: credentials?.email,
	  email: credentials?.email
	};
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
