import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Nav } from './nav';
import { prisma } from '@/lib/prisma';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sid = cookies().get('sid');

  if (!sid) {
    return redirect('/login');
  }

  const authSession = await prisma.authSession.findUnique({
    where: {
      id: sid.value,
    },
  });

  if (!authSession) {
    return redirect('/login');
  }

  return (
    <>
      <Nav />
      {children}
    </>
  );
}
