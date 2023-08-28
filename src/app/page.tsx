import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Nav } from "./nav";

export default function QRCodePage() {
  return (
    <>
      <Nav />
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
    </>
  );
}
