import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/zod-schema';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({
      success: false,
      r: 'bad request'
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: result.data.email
    }
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      r: 'invalid credentials'
    });
  }

  if (user.password !== result.data.password) {
    return NextResponse.json({
      success: false,
      r: 'invalid credentials'
    });
  }

  const authSession = await prisma.authSession.create({
    data: {
      userId: user.id,
    }
  });

  cookies().set('sid', authSession.id);

  return NextResponse.json({
    success: true,
    r: 'success'
  });
}
