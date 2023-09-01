import { NextRequest, NextResponse } from 'next/server';
import { attendanceLinkSchema } from '@/lib/zod-schema';
import { getCurrentUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const result = attendanceLinkSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json({
      success: false,
      r: 'bad request',
    });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({
      success: false,
      r: 'unauthenticated',
    });
  }

  const attendanceLink = await prisma.attendanceLink.create({
    data: {
      ...result.data,
    },
  });

  cookies().set('alid', attendanceLink.id);

  return NextResponse.json({
    success: true,
    r: attendanceLink.id,
  });
}
