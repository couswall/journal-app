import { z } from "zod";

const PASSWORD_RE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email({ message: "Enter a valid email" })),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  displayName: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email({ message: "Enter a valid email" })),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(PASSWORD_RE, {
      message:
        "Must be 8+ chars with uppercase, lowercase, number & special char",
    }),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
});
