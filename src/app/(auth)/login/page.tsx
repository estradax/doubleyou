'use client';

import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  function onSubmit(data: LoginSchema) {
    console.log(data);
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
