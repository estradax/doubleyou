import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sid = cookies().get('sid');

  if (sid) {
    const authSession = await prisma.authSession.findUnique({
      where: {
        id: sid.value,
      },
    });

    if (authSession) {
      return redirect('/');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-primary"
      >
        <img
          className="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      {children}
    </div>
  );
}
