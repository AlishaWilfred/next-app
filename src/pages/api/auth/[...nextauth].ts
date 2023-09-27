import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your@email.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password'
        }
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        })
        if (
          user &&
          user.password &&
          (await compare(credentials.password, user.password))
        ) {
          console.log({user})
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email
          }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
          ...(token?.user ? token.user : {})
        }
      }
    },
    jwt({ token, user }) {
      user && (token.user = user)
      return token
    }
  },
  // secret:process.env.NEXTAUTH_SECRET
}

export default NextAuth(options)
