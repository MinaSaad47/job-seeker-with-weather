import { z } from "zod";

export const ValidateLogin = z.object({
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(8, { message: "password must at least contains 8 characters" }),
});

export const ValidateRegister = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must at least contains 3 characters" }),
    email: z.string().email({ message: "invalid email address" }),
    password: z
      .string()
      .min(8, { message: "password must at least contains 8 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "passwords do not match",
        code: "custom",
        path: ["confirmPassword"],
      });
    }
  });