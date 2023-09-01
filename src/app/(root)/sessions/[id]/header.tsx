'use client';

import { Session } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function SessionDetailHeader({ session }: { session: Session }) {
  const { toast } = useToast();
  const router = useRouter();

  async function generateQRCode() {
    const res = await fetch('/api/attendance-links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: session.id,
      }),
    });

    const resData = (await res.json()) as any;
    if (!resData.success) {
      return toast({
        description: resData.r,
      });
    }

    return router.push('/');
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="font-semibold text-2xl">{session.name}</h1>
      <Button onClick={generateQRCode}>Generate QR Code</Button>
    </div>
  );
}
