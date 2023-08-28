'use client';

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const sessionSchema = z.object({
  name: z.string().min(2).max(50),
})

type SessionSchema = z.infer<typeof sessionSchema>;

export default function SessionFormDialog() {
  const form = useForm<SessionSchema>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: SessionSchema) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
	<Button>New</Button>
      </DialogTrigger>
      <DialogContent>
	<DialogHeader>
	  <DialogTitle className="mb-4">Create new session</DialogTitle>
	  <Form {...form}>
	    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
	      <FormField
		control={form.control}
		name="name"
		render={({ field }) => (
		  <FormItem>
		    <FormLabel>Name</FormLabel>
		    <FormControl>
		      <Input placeholder="Day 1" {...field} />
		    </FormControl>
		    <FormMessage />
		  </FormItem>
		)}
	      />
	      <div className="flex justify-end">
		<Button type="submit">Submit</Button>
	      </div>
	    </form>
	  </Form>
	</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
