import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
    acceptTermsAndConditions: z.boolean().refine((data) => data !== false, {
      message: 'Please check',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const sessionSchema = z.object({
  name: z.string().min(2).max(50),
});

export type SessionSchema = z.infer<typeof sessionSchema>;

export const attendanceLinkSchema = z.object({
  sessionId: z.string(),
});

export type AttendanceLinkSchema = z.infer<typeof attendanceLinkSchema>;
