import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const sid = cookies().get('sid');

  await prisma.authSession.delete({
    where: {
      id: sid?.value,
    },
  });

  return NextResponse.json({
    success: true,
    r: 'success',
  });
}
