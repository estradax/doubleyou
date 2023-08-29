import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
	email: { type: 'email' },
	password: { type: 'password' }
      },
      async authorize(credentials, req) {
	// TODO: implement this to check the password
	const user = await prisma.user.findUnique({
	  where: {
	    email: credentials?.email
	  },
	});

	return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
