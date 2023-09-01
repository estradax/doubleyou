'use client';

import { useQRCode } from 'next-qrcode';
import { AttendanceLink } from "@prisma/client";

export default function QRCode({ attendanceLink }: { attendanceLink: AttendanceLink }) {
  const { Image } = useQRCode();

  return (
    <Image text={`http://192.168.1.28:3000/attend/${attendanceLink.id}`} options={{
      type: 'image/jpeg',
      quality: 0.3,
      errorCorrectionLevel: 'M',
      margin: 3,
      scale: 4,
      width: 500,
      color: {
	dark: '#010599FF',
	light: '#FFBF60FF',
      },
      }}
    />
  );
}
