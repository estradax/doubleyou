import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Nav } from "./nav";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect('/login');
  }

  return (
    <>
      <Nav />
      {children}
    </>
  );
}
