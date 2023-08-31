import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import QRCode from "./qrcode";

export const dynamic = 'force-dynamic';

async function getAttendanceLinkDetail(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const attendanceLink = await prisma.attendanceLink.findUnique({
    include: {
      session: true
    },
    where: {
      id
    }
  });

  if (!attendanceLink) {
    return null;
  }

  if (attendanceLink.session.userId !== user.id) {
    return null;
  }

  return attendanceLink;
}

export default async function QRCodePage() {
  const alid = cookies().get('alid') || { value: 'garbage' };
  const attendanceLink = await getAttendanceLinkDetail(alid.value);

  return (
    <div className="flex justify-center p-4">
      <Card className="max-w-[500px] w-full">
	<CardHeader>
	  <CardTitle>QR Code</CardTitle>
	</CardHeader>
	<CardContent>
	  {attendanceLink ? (<QRCode attendanceLink={attendanceLink} />) : (<span>no session</span>)}
	</CardContent>
	<CardFooter className="flex justify-end">
	  <Button>End session</Button>
	</CardFooter>
      </Card>
    </div>
  );
}
