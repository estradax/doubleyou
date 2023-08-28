import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table";
import SessionFormDialog from "./session-form-dialog";

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

export default async function SessionsPage() {
  const data = await getData();

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl w-full p-4">
	<div className="flex justify-end mb-4">
	  <SessionFormDialog />	 
	</div>
	<DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
