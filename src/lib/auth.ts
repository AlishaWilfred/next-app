// import { prisma } from "@/lib/prisma";
// import { compare } from "bcrypt";
// import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { NextAuthOptions } from "next-auth";
import prisma from "./prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           return null;
//         }

//         const user: any = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !(await compare(credentials.password, user.password))) {
//           return null;
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           password: user.password,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     session: ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//         },
//       };
//     },
//     jwt: ({ token, user }) => {
//       if (user) {
//         const u = user as unknown as any;
//         return {
//           ...token,
//           id: u.id,
//         };
//       }
//       return token;
//     },
//   },
// };


const authOptions:NextAuthOptions={
  providers:[
    CredentialsProvider({
      name:"credentials",
      credentials:{
        email:{
          label:"Email",
          type:"text",
          placeholder:"abc@exmaple.com"
        },
        password:{
          label:"Password",
          type:"password",
          placeholder:"Enter your password"
        }
        
      },
      async authorize(credentials){
        if(!credentials) return null
        const user =await prisma.user.findUnique({
          where:{
            email:credentials.email
          }
        })
       if(user && user.password && (await compare(user.password,credentials.password))){
         console.log("USER",user)
        return {
          id:user.id.toString(),
          email:user.email,
          password:user.password
        }
       }else{
        return null
       }
      }
    })
  ],
  callbacks:{
    jwt({token,user}){
      user && (token.user=user)
      return token
    },
    session({session,token,user}){
      return {
        ...session,
        user:{
          ...session.user,
          ...user,
          ...(token.user?token.user:{})
        }
      }
    }
  }
}

export default authOptions