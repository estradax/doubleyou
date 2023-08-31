import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { registerSchema } from '@/lib/zod-schema';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({
      success: false,
      r: 'bad request'
    });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: result.data.email
    }
  });

  if (userExists) {
    return NextResponse.json({
      success: false,
      r: 'email is taken'
    });
  }

  const user = await prisma.user.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
    }
  });

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
