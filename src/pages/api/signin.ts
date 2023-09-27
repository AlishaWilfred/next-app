
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"
import prisma from '@/lib/prisma'


  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const body=req.body
    const hashPassword=await bcrypt.hash(body.password,12)
    const createUser=await prisma.user.create({
        data:{
            name:body.name,
            email:body.email,
            password:hashPassword
        }
    })
const {password,...result}=createUser
    res.status(200).json({result})
  }
  