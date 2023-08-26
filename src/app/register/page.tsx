'use client';

import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
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

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  acceptTermsAndConditions: z.boolean()
    .refine((data) => data !== false, {
      message: 'Please check'
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password do not match',
  path: ['confirmPassword']
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTermsAndConditions: false
    }
  });

  function onSubmit(data: RegisterSchema) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-primary">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
        Flowbite
      </a>
      <Card className="w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confim password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="acceptTermsAndConditions"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-muted-foreground">
                          I accept the <a className="font-medium text-primary hover:underline" href="#">Terms and Conditions</a>
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            </CardContent>
            <CardFooter className="block space-y-4">
              <Button className="w-full" type="submit">Create an account</Button>
              <p className="text-sm text-muted-foreground">
                Already have an account? <a href="#" className="font-medium text-primary hover:underline">Login here</a>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
