'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export function Nav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await fetch('/api/logout', {
      method: 'POST',
    });
    router.push('/login');
  }

  return (
    <nav className="bg-secondary border-border">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
	<a href="https://flowbite.com/" className="flex items-center">
	    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
	    <span className="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
	</a>
	<div className="flex items-center md:order-2">
	  <DropdownMenu>
	    <DropdownMenuTrigger>
	      <Avatar>
		<AvatarImage src="https://github.com/shadcn.png" />
		<AvatarFallback>CN</AvatarFallback>
	      </Avatar>
	    </DropdownMenuTrigger>
	    <DropdownMenuContent>
	      <DropdownMenuLabel>My Account</DropdownMenuLabel>
	      <DropdownMenuSeparator />
	      <DropdownMenuItem>Profile</DropdownMenuItem>
	      <DropdownMenuItem>Billing</DropdownMenuItem>
	      <DropdownMenuItem>Team</DropdownMenuItem>
	      <DropdownMenuItem>Subscription</DropdownMenuItem>
	      <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
	    </DropdownMenuContent>
	  </DropdownMenu>
	  <Button variant="outline" size="icon" className="ml-4 md:hidden" onClick={() => setOpen((prev) => !prev)}>
	    <AlignJustify />
	  </Button>
	</div>
	<div className={`items-center justify-between ${open ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
	  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-border rounded-lg bg-secondary md:flex-row md:space-x-8 md:mt-0 md:border-0">
	    <li>
	      <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">QR Code</Link>
	    </li>
	    <li>
	      <Link href="/sessions" className="block py-2 pl-3 pr-4 text-foreground rounded hover:bg-primary-foreground  md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Sessions</Link>
	    </li>
	    <li>
	      <a href="#" className="block py-2 pl-3 pr-4 text-foreground rounded hover:bg-primary-foreground md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Services</a>
	    </li>
	    <li>
	      <a href="#" className="block py-2 pl-3 pr-4 text-foreground rounded hover:bg-primary-foreground md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Contact</a>
	    </li>
	  </ul>
	</div>
      </div>
    </nav>
  );
}
