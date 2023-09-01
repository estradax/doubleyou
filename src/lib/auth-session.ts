import { cookies } from 'next/headers';
import { prisma } from './prisma';

export async function getCurrentUser() {
  const sid = cookies().get('sid');
  if (!sid) {
    return null;
  }

  const authSession = await prisma.authSession.findUnique({
    include: {
      user: true,
    },
    where: {
      id: sid.value,
    },
  });

  return authSession?.user;
}
