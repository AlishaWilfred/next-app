import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) return "User not found";
  const comparePass = await bcrypt.compare(body.password, user.password);
  if (comparePass && user) {
    const { password, ...result } = user;
    res.status(200).json(result);
  } else {
    res.status(500).json({ error: "Login error" });
  }
}

