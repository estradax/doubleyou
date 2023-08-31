import FormDialog from "./form-dialog";
import { Session } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-session";
import Table from "./table";

async function getSessions(): Promise<Session[]> {
  const user = await getCurrentUser();

  const sessions = await prisma.session.findMany({
    where: {
      userId: user?.id
    }
  });

  return sessions;
}

export default async function SessionsPage() {
  const data = await getSessions();

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl w-full p-4">
	<div className="flex justify-end mb-4">
	  <FormDialog />	 
	</div>
	<Table data={data} />
      </div>
    </div>
  );
}
