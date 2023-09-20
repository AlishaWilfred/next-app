import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
const handler:NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
        name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log({ user });
        // If no error and we have user data, return it
        if (res.ok && user) {
          console.log("HERERERERE");
          return user;
        } else {
          // Return null if user data could not be retrieved
          console.log("HEERER1");
          return null;
        }
      },
      // async authorize(credentials, req) {
      //     if(!credentials) return null
      //   const user:any=await prisma.user.findUnique({
      //     where:{
      //         email:credentials?.email
      //     }
      //   })
      //   if(!user) return null
      //   const ispasswordValid=await bcrypt.compare(credentials?.password!,user.password)
      //   if(!ispasswordValid) return null

      //   console.log({user})
      //   return user
      // }
    }),
  ],
  pages: {
    signIn: "api/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };



