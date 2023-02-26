import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { firebaseId, email, name } = req.body;

  const newUser = await prisma.user.create({
    data: {
      firebaseId,
      email,
      name
    }
  });

  res.status(200).json({ newUser });
};
