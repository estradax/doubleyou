import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function QRCodePage() {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect('/login');
  }

  return (
    <div className="flex justify-center p-4">
      <Card className="max-w-[500px] w-full">
	<CardHeader>
	  <CardTitle>QR Code</CardTitle>
	</CardHeader>
	<CardContent>
	  <Image src="/qrcode.png" width={500} height={500} alt="" />
	</CardContent>
	<CardFooter className="flex justify-end">
	  <Button>End session</Button>
	</CardFooter>
      </Card>
    </div>
  );
}
