'use client';

import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  async function onSubmit(data: LoginSchema) {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      // TODO: make this dynamic
      callbackUrl: '/'
    });

    if (!result?.ok || result?.error) {
      return toast({
	title: 'Something went wrong',
	description: 'Your sign in request failed. Please try again.',
	variant: 'destructive'
      });
    }

    return router.push(result?.url!); 
  }

  // TODO: make sure the card is shrink down when the container width is less than 400
  return (
    <Card className="w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="block space-y-4">
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</a>
            </div>
            <Button className="w-full" type="submit">Sign in</Button>
            <p className="text-sm text-muted-foreground">
              Dont't have an account yet? <Link href="/register" className="font-medium text-primary hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
