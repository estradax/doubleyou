import { getCurrentUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { sessionSchema } from '@/lib/zod-schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const result = sessionSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json({
      success: false,
      r: 'bad request'
    });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({
      success: false,
      r: 'unauthenticated'
    });
  }

  await prisma.session.create({
    data: {
      ...result.data,
      userId: user.id
    }
  });

  return NextResponse.json({
    success: true,
    r: 'success'
  });
}
