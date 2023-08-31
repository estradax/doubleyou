import { ColumnDef } from "@tanstack/react-table"
import { notFound } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-session";

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]
}

async function getSessionDetail(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const session = await prisma.session.findFirst({
    where: {
      AND: [
	{ id },
	{ userId: user.id }
      ]
    }
  });

  return session;
}

export default async function SessionDetailPage({ params }: { params: { id: string }}) {
  const data = await getData();
  const session = await getSessionDetail(params.id);
  if (!session) {
    return notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl w-full p-4">
	<div className="flex justify-between items-center mb-4">
	  <h1 className="font-semibold text-2xl">{session.name}</h1>
	  <Button>Generate QR Code</Button>
	</div>
	<DataTable columns={columns} data={data} />
      </div>
    </div>
  );

}
