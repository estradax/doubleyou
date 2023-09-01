import { getCurrentUser } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }

  const attendanceLink = await prisma.attendanceLink.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!attendanceLink) {
    // TODO: flash error message to user
    return redirect('/');
  }

  const sessionAttendeeExists = await prisma.sessionAttendee.findFirst({
    where: {
      AND: [{ sessionId: attendanceLink.sessionId }, { userId: user.id }],
    },
  });

  if (sessionAttendeeExists) {
    // TODO: flash error message to user
    return redirect('/');
  }

  const sessionAttendee = await prisma.sessionAttendee.create({
    data: {
      sessionId: attendanceLink.sessionId,
      userId: user.id,
    },
  });

  // TODO: report succesufl message flash
  return redirect('/');
}
